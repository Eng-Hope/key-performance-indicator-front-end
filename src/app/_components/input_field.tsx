import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
}
const FormInput: React.FC<FormInputProps> = ({
  register,
  name,
  label,
  type = "text",
  error,
  placeholder,
}) => (
  <div className="flex flex-col gap-2">
    <Label className="mb-1">{label}</Label>
    <Input
    step="any"
     min={0}
      placeholder={placeholder}
      className={`${
        error
          ? "border-destructive dark:border-destructive focus-visible:outline-destructive"
          : ""
      }`}
      {...register(name)}
      type={type}
    />
    {error && <p className="text-destructive">{error}</p>}
  </div>
);

export default FormInput;