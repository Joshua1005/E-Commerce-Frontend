import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { Product } from "@/context/ProductsProvider";
import { formatCurrency } from "@/utils/money";
import useCart from "@/hooks/useCart";
import { CheckCircle } from "lucide-react";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addOrUpdateCartItem } = useCart();

  const { _id, name, image, rating, priceCents } = product;

  const isAddedClassName = `${
    isAdded
      ? "opacity-100 visible overflow-visible"
      : "opacity-0 invisible overflow-hidden"
  }`;

  useEffect(() => {
    if (isAdded) {
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  }, [isAdded]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"h-10"}>{name}</CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        <section className={"h-40 min-h-40 flex justify-center items-center"}>
          <img
            className={"max-w-full max-h-full"}
            src={`src/assets/${image}`}
          />
        </section>
        <section>
          <p className={"font-semibold"}>${formatCurrency(priceCents)}</p>
        </section>
        <section className={"flex items-center gap-2"}>
          <img
            className={"w-20"}
            src={`src/assets/images/ratings/rating-${rating.stars * 10}.png`}
          />
          <span className={"text-sm"}>{rating.count}</span>
        </section>
        <section className={"grid gap-1"}>
          <Label htmlFor={`quantity-${_id}`}>Select a quantity:</Label>
          <Input
            min={1}
            max={99}
            id={`quantity-${_id}`}
            type={"number"}
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
          />
        </section>
        <section className={"flex-1"}>
          <div
            className={`flex items-center justify-center gap-2 text-emerald-600 transition-all ${isAddedClassName}`}
          >
            <CheckCircle size={15} />
            <span>Added</span>
          </div>
        </section>
        <section>
          <Button
            className={"w-full"}
            onClick={() => {
              addOrUpdateCartItem(_id, selectedQuantity);
              setIsAdded(true);
            }}
          >
            Add to Cart
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
