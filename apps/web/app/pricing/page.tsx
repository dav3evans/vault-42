import { redirect } from "next/navigation";

/**
 * Retired as its own nav destination — with only Axe Throwing live, a separate pricing
 * page was mostly "coming soon" line items. Its price table now lives on /axe-throwing
 * itself; this redirect just keeps any old links/bookmarks working.
 */
export default function PricingPage() {
  redirect("/axe-throwing#pricing");
}
