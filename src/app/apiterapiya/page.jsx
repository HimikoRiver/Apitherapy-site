import ApiterapiyaConditionPageClient from "@/components/ApiterapiyaConditionPageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("apiterapiya");

export const metadata = pageData.metadata;

export default function ApiterapiyaPage() {
  return <ApiterapiyaConditionPageClient pageData={pageData} />;
}