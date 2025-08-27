import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface BlockedPageProps {
  statusMessage?: string;
  contactEmail?: string;
}

export default function BlockedPage({
  statusMessage = "Your account is blocked or suspended.",
  contactEmail = "support@example.com",
}: BlockedPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Account Restricted
      </h1>
      <p className="mb-4">{statusMessage}</p>
      <p className="mb-6">
        Please contact us at <strong>{contactEmail}</strong> to resolve this
        issue.
      </p>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </div>
  );
}
