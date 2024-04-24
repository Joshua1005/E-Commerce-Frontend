import CartItemCard from "@/components/checkout/CartItemCard";
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import useDeliveryOptions from "@/hooks/useDeliveryOptions";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, loading } = useAuth();
  const { cart } = useCart();
  const { deliveryOptions } = useDeliveryOptions();
  const { products } = useProducts();

  useEffect(() => {
    if (loading) {
      if (!auth) {
        navigate("/", { state: location, replace: false });
      }
    }
  }, [auth]);

  const cartItemCard = cart.map((cartItem) => {
    const matchedProduct = products.find(
      (product) => product._id === cartItem.productId
    );

    return (
      <CartItemCard
        matchedProduct={matchedProduct}
        key={cartItem._id}
        cartItem={cartItem}
        deliveryOptions={deliveryOptions}
      />
    );
  });

  return (
    <main
      className={
        "mt-20 mx-auto grid grid-cols-1 md:grid-cols-6 gap-2 max-w-screen-lg md:px8 px-4"
      }
    >
      <section className={"grid gap-2 col-span-4"}>
        {cart.length <= 0 ? (
          <div>
            <div className={"text-muted-foreground font-semibold"}>
              No items added to cart.
            </div>
            <Button>
              <Link to={"/main"}>Browse product</Link>
            </Button>
          </div>
        ) : (
          cartItemCard
        )}
      </section>
      <section className={"col-span-2"}>
        <OrderSummaryCard />
      </section>
    </main>
  );
};

export default Checkout;
