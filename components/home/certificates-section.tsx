"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "./search-bar";
import { CertificateGrid } from "./certificate-grid";
import { NoCertificates } from "./no-certificates";
import type { Certificate } from "@/types/certificate";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = useMemo(() => {
    if (!searchTerm) return certificates;

    return certificates.filter(
      (cert) =>
        cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [certificates, searchTerm]);

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredCertificates.length > 0 ? (
        <CertificateGrid certificates={filteredCertificates} />
      ) : (
        <NoCertificates hasSearchTerm={!!searchTerm} />
      )}
    </>
  );
}
