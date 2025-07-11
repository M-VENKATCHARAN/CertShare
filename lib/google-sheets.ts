import type { Certificate } from "@/types/certificate";

// Google Sheets configuration
const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "your-sheet-id";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || "your-api-key";
const SHEET_NAME = "Certificates DB"; // Name of your sheet tab

interface SheetRow {
  [key: string]: string;
}

// Expected columns in Google Sheet:
// A: Certificate ID
// B: Recipient Name
// C: Recipient Email
// D: Course Name
// E: Issuer Name
// F: Issue Date
// G: Completion Date
// H: Duration
// I: Grade
// J: Skills (comma-separated)
// K: Instructor Name
// L: Verification Code
// M: Is Verified (TRUE/FALSE)

export async function fetchSheetData(): Promise<SheetRow[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `Failed to retrieve certificate data: ${response.statusText}. Please check the API endpoint or network connection.`
      );
    }

    const data = await response.json();
    const rows = data.values || [];

    if (rows.length === 0) {
      return [];
    }

    // First row contains headers
    const headers = rows[0];
    const dataRows = rows.slice(1);

    // Convert to objects
    return dataRows.map((row: string[]) => {
      const obj: SheetRow = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });
  } catch (error) {
    console.error("Error fetching Certificate data:", error);
    return [];
  }
}

export async function getCertificateById(
  id: string
): Promise<Certificate | null> {
  try {
    const sheetData = await fetchSheetData();

    const row = sheetData.find((row) => row.slug === id);

    if (!row) {
      return null;
    }

    // Convert sheet row to Certificate object
    const certificate: Certificate = {
      id: row.certificate_id,
      slug: row.slug,
      spaceSlug: row.space_slug,
      recipientName: row.recipient_name,
      recipientEmail: row.recipient_email,
      courseName: row.course_name,
      issuerName: row.issuer_name,
      issueDate: row.issue_date,
      completionDate: row.completion_date,
      duration: row.duration,
      certificateUrl: row.certificate_url,
      grade: row.grade,
      skills: row.skills ? row.skills.split(",").map((s) => s.trim()) : [],
      instructorName: row.instructor_name,
      isVerified: row.is_verified?.toLowerCase() === "true",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(certificate);

    return certificate;
  } catch (error) {
    console.error("Error getting certificate by ID:", error);
    return null;
  }
}

export async function getAllCertificates(): Promise<Certificate[]> {
  try {
    const sheetData = await fetchSheetData();

    return sheetData.map((row) => ({
      id: row.certificate_id,
      slug: row.slug,
      spaceSlug: row.space_slug,
      recipientName: row.recipient_name,
      recipientEmail: row.recipient_email,
      courseName: row.course_name,
      issuerName: row.issuer_name,
      issueDate: row.issue_date,
      completionDate: row.completion_date,
      duration: row.duration,
      certificateUrl: row.certificate_url,
      grade: row.grade,
      skills: row.skills ? row.skills.split(",").map((s) => s.trim()) : [],
      instructorName: row.instructor_name,
      isVerified: row.is_verified?.toLowerCase() === "true",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error getting all certificates:", error);
    return [];
  }
}

// Function to validate Google Sheets setup
export async function validateSheetSetup(): Promise<{
  isValid: boolean;
  error?: string;
  sampleData?: SheetRow[];
}> {
  try {
    const data = await fetchSheetData();

    if (data.length === 0) {
      return {
        isValid: false,
        error:
          "Certificate data is missing or empty. Please ensure that certificate data is provided.",
      };
    }

    // Check if required columns exist
    const requiredColumns = [
      "certificate_id",
      "recipient_name",
      "course_name",
      "issuer_name",
    ];

    const firstRow = data[0];
    const missingColumns = requiredColumns.filter(
      (col) => !firstRow.hasOwnProperty(col)
    );

    if (missingColumns.length > 0) {
      return {
        isValid: false,
        error: `Missing required columns: ${missingColumns.join(", ")}`,
      };
    }

    return {
      isValid: true,
      sampleData: data.slice(0, 3), // Return first 3 rows as sample
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
