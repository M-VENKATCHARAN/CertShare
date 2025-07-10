import { notFound } from "next/navigation";
import { getAllCertificates, getCertificateById } from "@/lib/google-sheets";
import type { Certificate } from "@/types/certificate";
import {
  CertificateDisplay,
  CertificateDetails,
  ShareOptions,
  SkillsBadges,
  CourseRecommendations,
} from "@/components/certificate";

export async function generateMetadata({ params }: CertificatePageProps) {
  const certificate = await getCertificateData(params.id);

  if (!certificate) {
    return {
      title: "Certificate Not Found",
      description: "The requested certificate could not be found.",
    };
  }

  return {
    title: `${certificate.recipientName} - ${certificate.courseName} Certificate`,
    description: `Certificate of completion for ${certificate.courseName} awarded to ${certificate.recipientName} by ${certificate.issuerName}`,
    openGraph: {
      title: `${certificate.recipientName} - ${certificate.courseName} Certificate`,
      description: `Certificate of completion for ${certificate.courseName} awarded to ${certificate.recipientName} by ${certificate.issuerName}`,
      images: [
        {
          url: certificate.certificateUrl,
          width: 800,
          height: 600,
          alt: `${certificate.courseName} Certificate`,
        },
      ],
    },
  };
}

interface CertificatePageProps {
  params: {
    course: string;
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const certificates = await getAllCertificates();

    return certificates.map((certificate) => ({
      course: certificate.spaceSlug,
      id: certificate.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export const dynamic = "force-static";

async function getCertificateData(id: string): Promise<Certificate | null> {
  try {
    const certificate = await getCertificateById(id);
    return certificate;
  } catch (error) {
    console.error("Failed to fetch certificate:", error);
    return null;
  }
}

export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const certificate = await getCertificateData(params.id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate Display */}
          <div className="lg:col-span-2">
            <CertificateDisplay certificate={certificate} />
            <ShareOptions certificate={certificate} />
          </div>

          {/* Certificate Details Sidebar */}
          <div className="space-y-6">
            <CertificateDetails certificate={certificate} />
            <SkillsBadges certificate={certificate} />
            <CourseRecommendations certificate={certificate} />
          </div>
        </div>
      </div>
    </div>
  );
}
