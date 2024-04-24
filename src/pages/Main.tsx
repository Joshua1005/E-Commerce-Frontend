import Header from "@/components/containers/Header";
import ProductCard from "@/components/products/ProductCard";
import Spinner from "@/components/ui/spinner";
import useAuth from "@/hooks/useAuth";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { products, isLoading } = useProducts();

  useEffect(() => {
    if (!auth) {
      navigate("/", { state: location, replace: true });
    }
  }, [auth]);

  return (
    <>
      {isLoading && <Spinner />}
      <Header />
      <main
        className={
          "grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-20"
        }
      >
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </main>
    </>
  );
};

export default Main;
