import { ProductsContext } from "@/context/ProductsProvider";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "./useAuth";

const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { auth } = useAuth();
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider.");
  }

  useEffect(() => {
    const searchText = searchParams.get("search");

    searchText ? context.searchProduct(searchText) : context.fetchData();
  }, [auth, searchParams]);

  return context;
};

export default useProducts;
