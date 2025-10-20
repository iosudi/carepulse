import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
interface SubmitButtonProps {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function SubmitButton({ children, className, isLoading }: SubmitButtonProps) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className={cn(className ?? "shad-primary-btn w-full")}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
