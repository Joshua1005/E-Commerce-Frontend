import { useEffect, useReducer, useState } from "react";
import useCart from "./useCart";
import { CartItem } from "@/context/CartProvider";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import useAuth from "./useAuth";

type Order = {
  _id: string;
  userId: string;
  cartItems: CartItem[];
  totalCents: number;
  createdAt: Date;
  updatedAt: Date;
};

type Action =
  | { type: "CREATE_ORDER"; payload: Order }
  | { type: "FETCH_DATA"; payload: Order[] };

const orderReducer = (order: Order[], { type, payload }: Action) => {
  switch (type) {
    case "FETCH_DATA":
      return [...payload];
    case "CREATE_ORDER":
      return [...order, payload];
  }
};

const initialState: Order[] = [];

const useOrder = () => {
  const [orders, dispatch] = useReducer(orderReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCart();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.get("/api/orders");

      if (res.status >= 200 && res.status) {
        dispatch({ type: "FETCH_DATA", payload: res.data.orders });
      }
    } catch (error) {
      const axiosError = (error as AxiosError)?.response?.data as Error;
      toast({ title: axiosError.message });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      setIsLoading(true);
      if (cart.length <= 0) {
        return toast({ title: "No items to purchase." });
      }
      const res = await axiosPrivate.post("/api/orders");

      if (res.status >= 200 && res.status) {
        window.location.href = res.data;
      }
    } catch (error) {
      const axiosError = (error as AxiosError)?.response?.data as Error;
      toast({ title: axiosError.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  return { orders, createOrder, isLoading };
};

export type { Order };

export default useOrder;
