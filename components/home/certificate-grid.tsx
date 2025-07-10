"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CertificateCard } from "./certificate-card";
import type { Certificate } from "@/types/certificate";

interface CertificateGridProps {
  certificates: Certificate[];
}

export function CertificateGrid({ certificates }: CertificateGridProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleCertificates = certificates.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {visibleCertificates.map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>

      {certificates.length > visibleCount && (
        <div className="text-center mt-6 mb-[6px]">
          <Button onClick={() => setVisibleCount((prev) => prev + 9)}>
            Show More
          </Button>
        </div>
      )}
    </>
  );
}
