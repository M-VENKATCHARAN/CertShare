"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Certificate } from "@/types/certificate";

interface CourseRecommendationsProps {
  certificate: Certificate;
}

export function CourseRecommendations({
  certificate,
}: CourseRecommendationsProps) {
  const courseName = certificate.spaceSlug.toLowerCase();

  if (courseName.includes("email")) {
    return (
      <Card>
        <CardContent className="p-6 pt-4">
          <h3 className="text-lg font-bold mb-4">Level Up Your Email Game</h3>
          <p className="text-sm text-gray-700 mb-3">
            Completed this? Master deliverability next.
          </p>
          <Button
            onClick={() =>
              (window.location.href =
                "https://mailmodo.com/courses/email-deliverability-course/")
            }
            className="bg-[#5a45fe] text-white"
          >
            Dive In
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (courseName.includes("deliverability")) {
    return (
      <Card>
        <CardContent className="p-6 pt-3 mt-[2px]">
          <h3 className="text-lg font-bold mb-4">Go Beyond Deliverability</h3>
          <p className="text-sm text-gray-700 mb-3">
            Master copy, design, and strategy too.
          </p>
          <Button
            onClick={() =>
              (window.location.href =
                "https://mailmodo.com/courses/email-marketing-certification/")
            }
            className="bg-[#5a45fe] text-white"
          >
            Join our Masterclass
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}
