import { cn } from "@/lib/utils";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type Props = {
  message: string;
  className?: string;
};

const FormSuccess: React.FC<Props> = ({ message, className }) => {
  return (
    <div className={cn("text-emerald-500 flex gap-2 items-center", className)}>
      <CheckCircledIcon className={"size-5"} />
      <span className={"text-xs"}>{message}</span>
    </div>
  );
};

export default FormSuccess;
