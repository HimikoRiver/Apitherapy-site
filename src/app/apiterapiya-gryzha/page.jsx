import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("gryzha");

export const metadata = pageData.metadata;

export default function ApiterapiyaGryzhaPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}