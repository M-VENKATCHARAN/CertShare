import { getAllCertificates, validateSheetSetup } from "@/lib/google-sheets";
import { HomeHeader, CertificatesSection, ErrorState } from "@/components/home";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mailmodo Achievers | Find & Share Your Course Certificates Easily",
    description:
      "Find your Mailmodo certificates on Achievers. Download, verify, and share them to showcase your email marketing skills.",
    keywords: "Certificates",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    openGraph: {
      type: "website",
      url: "/",
      title:
        "Mailmodo Achievers | Find & Share Your Course Certificates Easily",
      description:
        "Find your Mailmodo certificates on Achievers. Download, verify, and share them to showcase your email marketing skills.",
    },
  };
}

async function getCertificatesData() {
  try {
    const validation = await validateSheetSetup();

    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error || "Failed to validate sheet setup",
        certificates: [],
      };
    }

    const certificates = await getAllCertificates();

    const sortedCertificates = certificates.sort((a, b) => {
      return Date.parse(b.completionDate) - Date.parse(a.completionDate);
    });

    return {
      success: true,
      certificates: sortedCertificates,
      error: null,
    };
  } catch (error) {
    console.error("Error loading certificates:", error);
    return {
      success: false,
      error: "Failed to connect to Google Sheets",
      certificates: [],
    };
  }
}

export default async function HomePage() {
  const { success, certificates, error } = await getCertificatesData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <HomeHeader />

        {success ? (
          <CertificatesSection certificates={certificates} />
        ) : (
          <ErrorState error={error!} />
        )}
      </div>
    </div>
  );
}
