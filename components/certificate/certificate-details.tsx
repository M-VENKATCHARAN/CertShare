import { Card, CardContent } from "@/components/ui/card";
import { Shield, User, Calendar, CheckCircle } from "lucide-react";
import type { Certificate } from "@/types/certificate";

interface CertificateDetailsProps {
  certificate: Certificate;
}

export function CertificateDetails({ certificate }: CertificateDetailsProps) {
  return (
    <Card>
      <CardContent className="p-6 pt-6">
        <h3 className="text-lg font-semibold mb-5 flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Certificate Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Recipient</p>
              <p className="text-sm text-gray-600">
                {certificate.recipientName}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Completion Date
              </p>
              <p className="text-sm text-gray-600">
                {certificate.completionDate}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-[5px]">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">Verified by Mailmodo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
