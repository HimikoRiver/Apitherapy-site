import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("vospalenieSedalishchnogoNerva");

export const metadata = pageData.metadata;

export default function ApiterapiyaVospalenieSedalishchnogoNervaPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}