import { Order } from "@/hooks/useOrder";

type Props = {
  order: Order;
};

const OrderCard: React.FC<Props> = ({ order }) => {
  return <div>{order._id}</div>;
};

export default OrderCard;
