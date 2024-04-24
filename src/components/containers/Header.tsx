import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DropdownSettings from "@/components/containers/DropdownSettings";
import cartIcon from "@/assets/images/icons/cart-icon.png";
import useCart from "@/hooks/useCart";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [_, setSearchParams] = useSearchParams();
  const { totalCartQuantity } = useCart();

  return (
    <header
      className={
        "flex justify-between items-center md:px-8 px-4 fixed inset-0 h-16 shadow-md bg-primary-foreground/90 backdrop-blur supports-[backdrop-filter]:bg-primary-foreground/60"
      }
    >
      <section></section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchText
            ? setSearchParams({ search: searchText })
            : setSearchParams();
        }}
        className={"flex-1 flex justify-center gap-1"}
      >
        <Input
          className={"max-w-xl"}
          value={searchText}
          placeholder={"Search"}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button type={"submit"}>
          <Search size={15} />
        </Button>
      </form>
      <section className={"flex gap-2 items-center"}>
        <Link to={"/checkout"} className={"md:block hidden"}>
          <Button className={"relative flex justify-center items-end"}>
            <span className={"absolute w-5 text-center top-0 left-6"}>
              {totalCartQuantity}
            </span>
            <img className="w-8" src={cartIcon} />
            <span>Cart</span>
          </Button>
        </Link>
        <DropdownSettings />
      </section>
    </header>
  );
};

export default Header;
