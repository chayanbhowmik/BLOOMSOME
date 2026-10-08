import type { Metadata } from "next";
import AccountGate from "@/components/account/AccountGate";

export const metadata: Metadata = {
  title: "My Account — BLOOMSOME",
  description: "View your order history, delivery addresses, and saved items.",
};

export default function AccountPage() {
  return <AccountGate />;
}
