import { CartContext } from "@/context/CartProvider";
import { useContext } from "react";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
};

export default useCart;
