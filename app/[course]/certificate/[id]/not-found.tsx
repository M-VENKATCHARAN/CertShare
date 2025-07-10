import { ErrorState } from "@/components/certificate";

export default function NotFound() {
  return (
    <ErrorState error="The certificate you're looking for doesn't exist in our database." />
  );
}
