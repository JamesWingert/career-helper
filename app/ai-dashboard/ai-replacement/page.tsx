import { redirect } from "next/navigation";

export default function LegacyDashboardRoute() {
  redirect("/ai-dashboard#ai-impact");
}
