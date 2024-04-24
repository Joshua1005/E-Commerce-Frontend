import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AllHTMLAttributes } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

interface Props<T extends FieldValues>
  extends AllHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  childrenWithField?: (field: ControllerRenderProps<T>) => React.ReactNode;
}

const FormFieldContainer = <T extends FieldValues>({
  control,
  name,
  type,
  label,
  placeholder,
  childrenWithField,
  className,
}: Props<T>) => {
  const formLabel =
    name.charAt(0).toUpperCase() +
    name
      .slice(1)
      .split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel
              title={formLabel}
              className={cn(className, "line-clamp-1")}
            >
              {label || formLabel}
            </FormLabel>
            <FormControl>
              {childrenWithField ? (
                childrenWithField(field)
              ) : (
                <Input {...field} type={type} placeholder={placeholder} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormFieldContainer;
