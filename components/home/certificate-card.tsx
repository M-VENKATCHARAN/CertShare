import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">
              {certificate.recipientName}
            </CardTitle>
            <CardDescription className="mt-1">
              {certificate.issuerName}
            </CardDescription>
          </div>
          <Badge
            variant={certificate.isVerified ? "default" : "secondary"}
            className="ml-2"
          >
            {certificate.isVerified ? "Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium text-gray-900">{certificate.courseName}</p>
          <p className="text-sm text-gray-600">
            Completed: {certificate.completionDate}
          </p>
          {certificate.grade && (
            <p className="text-sm text-gray-600">Grade: {certificate.grade}</p>
          )}
        </div>

        {certificate.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {certificate.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {certificate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{certificate.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <Button asChild className="w-full">
          <Link
            href={`/${certificate.spaceSlug}/certificate/${certificate.slug}`}
          >
            View Certificate
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
