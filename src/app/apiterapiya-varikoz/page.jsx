import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("varikoz");

export const metadata = pageData.metadata;

export default function ApiterapiyaVarikozPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}