"use client";

import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">
              Search certificates
            </Label>
            <Input
              id="search"
              placeholder="Search by name, course, or certificate ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
