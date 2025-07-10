"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function ErrorState({ error, onRefresh, refreshing }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="max-w-md">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Certificate Not Found</h2>
          <p className="text-gray-600 mb-4">
            {error ||
              "The certificate you're looking for doesn't exist in our Google Sheets database."}
          </p>
          <div className="space-y-2">
            {onRefresh && (
              <Button
                onClick={onRefresh}
                disabled={refreshing}
                className="w-full"
              >
                {refreshing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh from Sheets
                  </>
                )}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full bg-transparent"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
