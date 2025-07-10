import { Award } from "lucide-react";

export function HomeHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Award className="h-12 w-12 text-[#5a45fe]" />
        <h1 className="text-4xl font-bold text-gray-900">Mailmodo Achievers</h1>
      </div>
      <p className="text-xl text-gray-600 mb-4">
        Get your certificates & show off your skills
      </p>
    </div>
  );
}
