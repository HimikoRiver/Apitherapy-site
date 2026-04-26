import ApiterapiyaDiseasePageClient from "@/components/ApiterapiyaDiseasePageClient";
import { getApiterapiyaConditionData } from "@/data/apiterapiyaConditionsData";

const pageData = getApiterapiyaConditionData("artritArtroz");

export const metadata = pageData.metadata;

export default function ApiterapiyaArtritArtrozPage() {
  return <ApiterapiyaDiseasePageClient pageData={pageData} />;
}