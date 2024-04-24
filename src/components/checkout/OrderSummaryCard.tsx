import { HTMLAttributes, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import useDeliveryOptions from "@/hooks/useDeliveryOptions";
import { Checkbox } from "../ui/checkbox";
import { formatCurrency } from "@/utils/money";
import CardContainer from "@/components/containers/CardContainer";
import useOrder from "@/hooks/useOrder";
import Spinner from "../ui/spinner";

type Props = HTMLAttributes<HTMLDivElement> & {};

const OrderSummaryCard: React.FC<Props> = () => {
  const [openPaypal, setOpenPaypal] = useState(false);
  const { cart } = useCart();
  const { createOrder, isLoading } = useOrder();
  const { products } = useProducts();
  const { deliveryOptions } = useDeliveryOptions();
  const taxPercentage = 10;
  const { subTotal, subContainer, subtitle } = {
    subtitle: "font-semibold",
    subContainer: "flex justify-between items-center",
    subTotal: "text-muted-foreground",
  };

  const totalItem = useMemo(() => {
    return cart.reduce((prev, cartItem) => (prev += cartItem.quantity), 0);
  }, [cart]);

  const totalPriceCents = cart.reduce((prev, cartItem) => {
    const matchedProduct = products.find(
      (product) => product._id === cartItem.productId
    );

    if (!matchedProduct) return 0;

    return (prev += matchedProduct?.priceCents * cartItem.quantity);
  }, 0);
  const totalCostCents = cart.reduce((prev, cartItem) => {
    const matchedOptions = deliveryOptions.find(
      (deliveryOption) => deliveryOption.type === cartItem.deliveryOption
    );

    if (!matchedOptions) return 0;

    return (prev += matchedOptions.costCents * cartItem.quantity);
  }, 0);
  const subTotalCents = totalPriceCents + totalCostCents;
  const totalTaxCents = subTotalCents / taxPercentage;
  const totalCents = subTotalCents + totalTaxCents;

  return (
    <>
      {isLoading && <Spinner />}
      <CardContainer title="Order summary">
        <article className="text-sm">
          <section className={cn(subContainer)}>
            <span className={cn(subtitle)}>
              {totalItem <= 1 ? "Item" : "Items"} ({totalItem}):
            </span>
            <span className={cn(subTotal)}>
              ${formatCurrency(totalPriceCents)}
            </span>
          </section>
          <section className={cn(subContainer, "pb-2")}>
            <span className={cn(subtitle)}>Shipping & Handling:</span>
            <span className={cn(subTotal)}>
              ${formatCurrency(totalCostCents)}
            </span>
          </section>
          <section className={cn(subContainer, "pt-2 border-t")}>
            <span className={cn(subtitle)}>Total before tax:</span>
            <span className={cn(subTotal)}>
              ${formatCurrency(subTotalCents)}
            </span>
          </section>
          <section className={cn(subContainer, "pb-2 border-b")}>
            <span className={cn(subtitle)}>
              Estimated tax ({taxPercentage}%):
            </span>
            <span className={cn(subTotal)}>
              ${formatCurrency(totalTaxCents)}
            </span>
          </section>
        </article>
        <article className="grid gap-2">
          <section className={cn(subContainer, "py-2")}>
            <span className={cn(subtitle)}>Order total:</span>
            <span className={cn(subTotal)}>${formatCurrency(totalCents)}</span>
          </section>
          <section className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(e: boolean) => setOpenPaypal(e)}
              checked={openPaypal}
              id="paypal"
            />
            <label
              htmlFor="paypal"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use Paypal
            </label>
          </section>
          <Button
            disabled={!!!cart.length}
            onClick={() => createOrder()}
            className="w-full"
          >
            Place your order
          </Button>
        </article>
      </CardContainer>
    </>
  );
};

export default OrderSummaryCard;
