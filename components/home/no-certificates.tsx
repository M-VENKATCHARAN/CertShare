import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface NoCertificatesProps {
  hasSearchTerm: boolean;
}

export function NoCertificates({ hasSearchTerm }: NoCertificatesProps) {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No certificates found
        </h3>
        <p className="text-gray-600">
          {hasSearchTerm
            ? "Try adjusting your search terms"
            : "No certificates available in the Google Sheet"}
        </p>
      </CardContent>
    </Card>
  );
}
