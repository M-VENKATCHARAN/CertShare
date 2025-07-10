import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Certificate } from "@/types/certificate";

interface SkillsBadgesProps {
  certificate: Certificate;
}

export function SkillsBadges({ certificate }: SkillsBadgesProps) {
  if (certificate.skills.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-6 pt-5">
        <h3 className="text-lg font-semibold mb-6">Skills Acquired</h3>
        <div className="flex flex-wrap gap-2">
          {certificate.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
