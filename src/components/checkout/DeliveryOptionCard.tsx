import { Label } from "../ui/label";
import { RadioGroupItem } from "../ui/radio-group";
import dayjs from "dayjs";
import { CartItem } from "@/context/CartProvider";
import { DeliveryOption } from "@/hooks/useDeliveryOptions";
import { formatCurrency } from "@/utils/money";

type Props = {
  today: dayjs.Dayjs;
  deliveryOption: DeliveryOption;
  cartItem: CartItem;
};

const DeliveryOptionCard: React.FC<Props> = ({
  today,
  deliveryOption,
  cartItem,
}) => {
  const dateString = today
    .add(deliveryOption.day, "day")
    .format("dddd, MMMM DD");

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        value={deliveryOption.type}
        id={`${deliveryOption._id}-${cartItem._id}`}
      />
      <Label
        htmlFor={`${deliveryOption._id}-${cartItem._id}`}
        className="grid gap-1"
      >
        <span>{dateString}</span>
        <span className="text-muted-foreground">
          {deliveryOption.costCents === 0
            ? "FREE "
            : `$${formatCurrency(deliveryOption.costCents)} - `}
          Shipping
        </span>
      </Label>
    </div>
  );
};

export default DeliveryOptionCard;
