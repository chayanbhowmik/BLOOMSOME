const baseUrl = (process.env.SHIPROCKET_API_BASE_URL || "https://apiv2.shiprocket.in/v1/external").replace(/\/$/, "");

export const shiprocketConfigured = Boolean(
  process.env.SHIPROCKET_API_KEY && process.env.SHIPROCKET_API_SECRET
);

type ShiprocketResponse<T> = { data: T; error?: never } | { data?: never; error: string };

async function shiprocketRequest<T>(path: string, init: RequestInit = {}): Promise<ShiprocketResponse<T>> {
  if (!shiprocketConfigured) return { error: "Shiprocket is not configured on the server." };

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.SHIPROCKET_API_KEY as string,
      "X-Api-Secret": process.env.SHIPROCKET_API_SECRET as string,
      ...init.headers,
    },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null) as { data?: T; message?: string; error?: string } | null;
  if (!response.ok) return { error: payload?.message || payload?.error || `Shiprocket request failed (${response.status}).` };
  return { data: (payload?.data ?? payload) as T };
}

export type ShiprocketServiceability = {
  available: boolean;
  couriers: unknown[];
};

export function checkShiprocketServiceability(pickupPostcode: string, deliveryPostcode: string, weight: number) {
  const params = new URLSearchParams({ pickup_postcode: pickupPostcode, delivery_postcode: deliveryPostcode, weight: String(weight), cod: "1" });
  return shiprocketRequest<ShiprocketServiceability>(`/courier/serviceability?${params}`);
}

export type CreateShiprocketOrderInput = {
  orderId: string;
  orderDate: string;
  pickupLocation: string;
  billingCustomerName: string;
  billingLastName?: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingPostcode: string;
  billingEmail: string;
  billingPhone: string;
  shippingIsBilling: boolean;
  orderItems: { name: string; sku: string; units: number; sellingPrice: number }[];
  subtotal: number;
  shipping: number;
  paymentMethod: "COD" | "Prepaid";
  length: number;
  breadth: number;
  height: number;
  weight: number;
};

export function createShiprocketOrder(input: CreateShiprocketOrderInput) {
  return shiprocketRequest<{ order_id: number; shipment_id: number; status: string }>("/orders/create/adhoc", {
    method: "POST",
    body: JSON.stringify({
      ...input,
      billing_last_name: input.billingLastName || "",
      shipping_customer_name: input.billingCustomerName,
      shipping_last_name: input.billingLastName || "",
      shipping_address: input.billingAddress,
      shipping_city: input.billingCity,
      shipping_state: input.billingState,
      shipping_postcode: input.billingPostcode,
      shipping_email: input.billingEmail,
      shipping_phone: input.billingPhone,
      order_items: input.orderItems,
      payment_method: input.paymentMethod,
    }),
  });
}