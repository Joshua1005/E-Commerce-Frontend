import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  description?: string;
  footer?: React.ReactNode;
  footerClassName?: string;
};

const CardContainer: React.FC<Props> = ({
  children,
  className,
  title,
  description,
  footer,
  footerClassName,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn(className)}>{children}</CardContent>
      {footer && (
        <CardFooter className={cn(footerClassName)}>{footer}</CardFooter>
      )}
    </Card>
  );
};

export default CardContainer;
