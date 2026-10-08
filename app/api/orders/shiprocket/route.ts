import { NextResponse } from "next/server";
import { createShiprocketOrder, type CreateShiprocketOrderInput } from "@/lib/shiprocket";

export async function POST(request: Request) {
  try {
    const order = await request.json() as CreateShiprocketOrderInput;
    if (!order.orderId || !order.billingCustomerName || !order.billingAddress || !order.billingPostcode || !order.billingPhone || !order.orderItems?.length) {
      return NextResponse.json({ error: "Order and complete delivery details are required." }, { status: 400 });
    }
    const result = await createShiprocketOrder(order);
    return result.error ? NextResponse.json({ error: result.error }, { status: 502 }) : NextResponse.json(result.data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid Shiprocket order request." }, { status: 400 });
  }
}