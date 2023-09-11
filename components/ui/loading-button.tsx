import { CircleDashed } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  action: () => void;
  children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  setLoading,
  action,
  children,
  ...props
}) => {
  return (
    <Button
      disabled={loading}
      onClick={() => {
        action();
        setLoading(true);
      }}
      {...props}
    >
      <div className="flex items-center justify-center gap-x-2">
        {loading ? (
          <CircleDashed className={cn("animate-spin h-4 w-4")} />
        ) : null}
        {children}
      </div>
    </Button>
  );
};
