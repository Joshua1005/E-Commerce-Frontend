import OrderCard from "@/components/orders/OrderCard";
import useOrder from "@/hooks/useOrder";

const Orders = () => {
  const { orders } = useOrder();

  return orders.map((order) => {
    return <OrderCard order={order} key={order._id} />;
  });
};

export default Orders;
