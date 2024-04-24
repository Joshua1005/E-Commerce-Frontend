import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

type DeliveryOption = {
  _id: string;
  type: string;
  costCents: number;
  day: number;
};

const useDeliveryOptions = () => {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.get("/api/deliveryOptions");

      if (res.status >= 200 && res.status < 300) {
        setDeliveryOptions(res.data.deliveryOptions);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  return { deliveryOptions };
};

export type { DeliveryOption };
export default useDeliveryOptions;
