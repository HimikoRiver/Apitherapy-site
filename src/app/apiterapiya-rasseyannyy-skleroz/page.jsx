import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("rasseyannyySkleroz");

export const metadata = pageData.metadata;

export default function ApiterapiyaRasseyannyySklerozPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}