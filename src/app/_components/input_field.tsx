import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

const FormInput = <T extends FieldValues>({
  register,
  name,
  label,
  type = "text",
  error,
  placeholder,
  isTextArea,
}: FormInputProps<T>) => (
  <div className="flex flex-col gap-2">
    <Label className="mb-1">{label}</Label>
    {isTextArea ? (
      <Textarea
        min={0}
        placeholder={placeholder}
        className={`${
          error ? "border-destructive dark:border-destructive focus-visible:outline-destructive" : ""
        }`}
        {...register(name)}
      />
    ) : (
      <Input
        step="any"
        min={0}
        placeholder={placeholder}
        className={`${
          error ? "border-destructive dark:border-destructive focus-visible:outline-destructive" : ""
        }`}
        {...register(name)}
        type={type}
      />
    )}

    {error && <p className="text-destructive">{error}</p>}
  </div>
);

export default FormInput;
