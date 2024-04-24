import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60 fixed inset-0">
      <div
        className={cn(
          "size-40 border-r-primary-foreground border-r-2 rounded-full animate-spin",
          className
        )}
      ></div>
    </div>
  );
};

export default Spinner;
