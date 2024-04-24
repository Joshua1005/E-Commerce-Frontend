import { cn } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {
  message: string;
  className?: string;
};

const FormError: React.FC<Props> = ({ message, className }) => {
  return (
    <div className={cn("text-red-500 flex gap-2 items-center", className)}>
      <ExclamationTriangleIcon className={"size-5"} />
      <span className={"text-xs"}>{message}</span>
    </div>
  );
};

export default FormError;
