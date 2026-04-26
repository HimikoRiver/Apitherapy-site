import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("nevritLitsevogoNerva");

export const metadata = pageData.metadata;

export default function ApiterapiyaNevritLitsevogoNervaPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}