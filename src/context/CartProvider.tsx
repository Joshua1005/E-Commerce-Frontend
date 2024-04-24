import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createContext, useEffect, useMemo, useReducer } from "react";

type CartItem = {
  _id: string;
  userId: string;
  productId: string;
  deliveryOption: "free" | "standard" | "express";
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

type Action =
  | { type: "FETCH_DATA"; payload: CartItem[] }
  | { type: "ADD_OR_UPDATE_CART_ITEM"; payload: CartItem }
  | { type: "UPDATE_CART_ITEM"; payload: CartItem }
  | { type: "DELETE_CART_ITEM"; payload: { productId: string } };

type ContextProvider = {
  cart: CartItem[];
  addOrUpdateCartItem: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (payload: CartItem) => Promise<void>;
  deleteCartItem: (payload: { productId: string }) => Promise<void>;
  totalCartQuantity: number;
};

const cartReducer = (cart: CartItem[], { type, payload }: Action) => {
  switch (type) {
    case "FETCH_DATA":
      return [...payload];
    case "ADD_OR_UPDATE_CART_ITEM":
      const isCarted = cart.find(
        (cartItem) => cartItem.productId === payload.productId
      );

      if (isCarted) {
        return [...cart].map((cartItem) => {
          const matchedProduct = cartItem._id === isCarted._id;
          if (matchedProduct) {
            return { ...cartItem, quantity: payload.quantity };
          } else {
            return cartItem;
          }
        });
      } else {
        return [...cart, payload];
      }
    case "UPDATE_CART_ITEM":
      return [...cart].map((cartItem) => {
        const matchedProduct = cartItem.productId === payload.productId;

        if (matchedProduct) {
          return { ...cartItem, deliveryOption: payload.deliveryOption };
        } else {
          return cartItem;
        }
      });
    case "DELETE_CART_ITEM":
      return [...cart].filter(
        (cartItem) => cartItem.productId !== payload.productId
      );
    default:
      throw new Error("Unrecognized action.");
  }
};

const initialState: CartItem[] = [];

const CartContext = createContext<ContextProvider | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.get("/api/cart");

      if (res.status >= 200 && res.status < 300) {
        dispatch({ type: "FETCH_DATA", payload: res.data.cart });
      }
    } catch (error) {}
  };

  const addOrUpdateCartItem = async (productId: string, quantity: number) => {
    try {
      const res = await axiosPrivate.post(`/api/cart/${productId}`, {
        quantity,
      });

      if (res.status >= 200 && res.status < 300) {
        const payload = { ...res.data.cartItem };
        dispatch({ type: "ADD_OR_UPDATE_CART_ITEM", payload });
      }
    } catch (error) {}
  };

  const updateCartItem = async (payload: CartItem) => {
    try {
      const res = await axiosPrivate.put(`/api/cart/${payload.productId}`, {
        deliveryOption: payload.deliveryOption,
      });

      if (res.status >= 200 && res.status < 300) {
        dispatch({ type: "UPDATE_CART_ITEM", payload });
      }
    } catch (error) {}
  };

  const deleteCartItem = async (payload: { productId: string }) => {
    try {
      const res = await axiosPrivate.delete(`/api/cart/${payload.productId}`);

      if (res.status >= 200 && res.status < 300) {
        dispatch({ type: "DELETE_CART_ITEM", payload });
      }
    } catch (error) {}
  };

  const totalCartQuantity = useMemo(() => {
    return cart.reduce((total, cartItem) => (total += cartItem.quantity), 0);
  }, [cart]);

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addOrUpdateCartItem,
        updateCartItem,
        deleteCartItem,
        totalCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export type { CartItem };
export { CartContext };
export default CartProvider;
