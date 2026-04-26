import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("boleznParkinsona");

export const metadata = pageData.metadata;

export default function ApiterapiyaBoleznParkinsonaPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}