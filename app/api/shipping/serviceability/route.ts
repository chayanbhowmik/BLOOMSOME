import { NextResponse } from "next/server";
import { checkShiprocketServiceability } from "@/lib/shiprocket";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { pickupPostcode?: string; deliveryPostcode?: string; weight?: number };
    if (!body.pickupPostcode || !body.deliveryPostcode || !body.weight || body.weight <= 0) {
      return NextResponse.json({ error: "Pickup PIN, delivery PIN, and a positive parcel weight are required." }, { status: 400 });
    }
    const result = await checkShiprocketServiceability(body.pickupPostcode, body.deliveryPostcode, body.weight);
    return result.error ? NextResponse.json({ error: result.error }, { status: 502 }) : NextResponse.json(result.data);
  } catch {
    return NextResponse.json({ error: "Invalid shipping serviceability request." }, { status: 400 });
  }
}