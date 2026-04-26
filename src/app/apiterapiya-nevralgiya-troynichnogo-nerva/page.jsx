import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("nevralgiyaTroynichnogoNerva");

export const metadata = pageData.metadata;

export default function ApiterapiyaNevralgiyaTroynichnogoNervaPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}