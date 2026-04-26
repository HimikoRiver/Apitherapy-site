import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("podagra");

export const metadata = pageData.metadata;

export default function ApiterapiyaPodagraPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}