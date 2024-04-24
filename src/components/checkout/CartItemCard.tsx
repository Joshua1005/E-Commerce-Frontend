import { CartItem } from "@/context/CartProvider";
import CardContainer from "@/components/containers/CardContainer";
import dayjs from "dayjs";
import { Product } from "@/context/ProductsProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/money";
import { Input } from "@/components/ui/input";
import { DeliveryOption } from "@/hooks/useDeliveryOptions";
import { RadioGroup } from "@/components/ui/radio-group";
import DeliveryOptionCard from "@/components/checkout/DeliveryOptionCard";
import useCart from "@/hooks/useCart";

type Props = {
  cartItem: CartItem;
  matchedProduct?: Product;
  deliveryOptions: DeliveryOption[];
};

const CartItemCard: React.FC<Props> = ({
  cartItem,
  matchedProduct,
  deliveryOptions,
}) => {
  const [updatedQuantity, setUpdatedQuantity] = useState(cartItem.quantity);
  const [editMode, setEditMode] = useState(false);
  const { addOrUpdateCartItem, updateCartItem, deleteCartItem } = useCart();

  const today = dayjs(new Date());

  if (!matchedProduct) {
    return null;
  }

  const matchedOption = deliveryOptions.find(
    (deliveryOption) => deliveryOption.type === cartItem.deliveryOption
  );

  const dateString = today
    .add(matchedOption ? matchedOption.day : 7, "day")
    .format("dddd, MMMM DD");

  return (
    <CardContainer
      title={dateString}
      className={"flex flex-col md:flex-row justify-center items-start"}
    >
      <section className={"w-24 pr-5 flex justify-center items-start"}>
        <img
          className={"max-w-full max-h-full"}
          src={`assets/${matchedProduct.image}`}
        />
      </section>
      <section className={"leading-7 flex-1"}>
        <p>{matchedProduct.name}</p>
        <p className={"font-semibold text-sm"}>
          ${formatCurrency(matchedProduct.priceCents)}
        </p>
        <div className={"flex gap-2 text-sm h-10 items-center"}>
          <p>Quantity:</p>
          {editMode ? (
            <Input
              min={1}
              max={99}
              type={"number"}
              className={"max-w-14"}
              defaultValue={cartItem.quantity}
              onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
            />
          ) : (
            <p>{cartItem.quantity}</p>
          )}
        </div>
        <div className={"space-x-2"}>
          <Button
            onClick={() => {
              setEditMode(!editMode);
              if (editMode) {
                const quantity = updatedQuantity - cartItem.quantity;
                addOrUpdateCartItem(cartItem.productId, quantity);
              }
            }}
            size={"sm"}
          >
            {editMode ? "Save" : "Update"}
          </Button>
          <Button
            onClick={() => deleteCartItem(cartItem)}
            size={"sm"}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      </section>
      <section className="grid gap-2 p-5">
        <div>Delivery Options</div>
        <RadioGroup
          onValueChange={(e: "free" | "standard" | "express") => {
            updateCartItem({ ...cartItem, deliveryOption: e });
          }}
          value={cartItem.deliveryOption}
        >
          {deliveryOptions.map((deliveryOption) => {
            return (
              <DeliveryOptionCard
                cartItem={cartItem}
                key={deliveryOption._id}
                deliveryOption={deliveryOption}
                today={today}
              />
            );
          })}
        </RadioGroup>
      </section>
    </CardContainer>
  );
};

export default CartItemCard;
