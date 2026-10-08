import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { adminAuth, adminDb, firebaseAdminConfigured } from "@/lib/firebaseAdmin";
import { r2, r2Bucket, r2Configured, r2PublicBaseUrl } from "@/lib/r2";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
]);

export async function POST(request: Request) {
  if (!firebaseAdminConfigured || !adminAuth || !adminDb) {
    return NextResponse.json({ error: "Firebase Admin SDK is not configured on the server." }, { status: 503 });
  }
  if (!r2Configured || !r2) {
    return NextResponse.json({ error: "Cloudflare R2 is not configured on the server." }, { status: 503 });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Admin authentication is required." }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(authorization.slice(7));
    const payload = await request.json() as { fileName?: string; contentType?: string; folder?: string };
    const fileName = payload.fileName?.trim();
    const contentType = payload.contentType?.trim();
    const folder = payload.folder?.trim().replace(/[^a-zA-Z0-9/_-]/g, "") || "admin-media";

    if (!fileName || !contentType || !allowedTypes.has(contentType)) {
      return NextResponse.json({ error: "Provide a valid file name and supported image/video content type." }, { status: 400 });
    }

    const adminSnapshot = await adminDb.collection("admins").doc(decoded.uid).get();
    const role = adminSnapshot.data()?.role;
    const isAdmin = adminSnapshot.exists && ["super_admin", "manager", "artisan"].includes(role);
    if (!isAdmin) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });

    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `${folder}/${crypto.randomUUID()}-${safeFileName}`;
    const uploadUrl = await getSignedUrl(r2, new PutObjectCommand({ Bucket: r2Bucket, Key: key, ContentType: contentType }), { expiresIn: 600 });
    const publicUrl = r2PublicBaseUrl ? `${r2PublicBaseUrl}/${key}` : undefined;

    return NextResponse.json({ key, uploadUrl, publicUrl, expiresIn: 600 });
  } catch {
    return NextResponse.json({ error: "Unable to authorize or create the R2 upload URL." }, { status: 401 });
  }
}