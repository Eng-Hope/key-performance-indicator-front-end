import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SubmitButton = ({
  loading,
  label = "submit",
  className
}: {
  loading: boolean;
  label?: string;
  className?: string
}) => {
  return (
    <Button
      disabled={loading}
      type={loading ? "button" : "submit"}
      className={cn("mt-3 text-md font-bold ", className)}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-3 rounded-full border-4 border-foreground border-t-transparent"
          viewBox="0 0 24 24"
        />
      )}
      {label}
    </Button>
  );
};

export default SubmitButton;