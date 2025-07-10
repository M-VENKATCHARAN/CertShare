import type { MetadataRoute } from "next";
import { getAllCertificates } from "@/lib/google-sheets";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://courses.mailmodo.com";

  const conversionRoutes = await getAllCertificates();

  const staticImportantRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
  ] as const;

  const dynamicRoutes = conversionRoutes.map((route) => ({
    url: `${baseUrl}/${route.spaceSlug}/certificate/${route.slug}`,
    lastModified: new Date(route.updatedAt),
    priority: 0.7,
  }));

  return [...staticImportantRoutes, ...dynamicRoutes];
}
