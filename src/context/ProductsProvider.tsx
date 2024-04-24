import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createContext, useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  image: string;
  rating: {
    stars: number;
    count: number;
  };
  priceCents: number;
  keywords: string[];
};

type ContextProvider = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchData: () => Promise<void>;
  searchProduct: (searchText: string) => Promise<void>;
  isLoading: boolean;
};

const ProductsContext = createContext<ContextProvider | null>(null);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fetchData = async () => {
    try {
      setisLoading(true);
      const res = await axiosPrivate.get("/api/products");

      setProducts(res.data.products);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  const searchProduct = async (searchText: string) => {
    try {
      setisLoading(true);
      const res = await axiosPrivate.get(`/api/products/${searchText}`);

      setProducts(res.data.products);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, fetchData, searchProduct, isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export type { Product };
export { ProductsContext };
export default ProductsProvider;
