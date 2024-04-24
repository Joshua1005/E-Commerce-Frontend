import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Settings, ShoppingCart } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import axios from "@/config/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const DropdownSettings = () => {
  const { auth, setAuth } = useAuth();

  const signOut = async () => {
    try {
      await axios.post("/api/auth/signout");

      setAuth(null);
    } catch (error) {
      console.log(error);
      const axiosError = (error as AxiosError)?.response?.data as Error;
      toast({ title: axiosError.message });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <ChevronDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={"flex items-center gap-2"}>
          <Avatar>
            <AvatarImage src={auth?.user.avatar} />
            <AvatarFallback>{auth?.user.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{`${auth?.user?.firstName} ${
            auth?.user?.middleName ? `${auth?.user?.middleName.charAt(0)}.` : ""
          } ${auth?.user?.lastName}`}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={"gap-2"}>
            <Settings size={15} />
            <span>Settings</span>
          </DropdownMenuItem>
          <Link className={"md:hidden block"} to={"/checkout"}>
            <DropdownMenuItem className={"gap-2"}>
              <ShoppingCart size={15} />
              <span>Checkout</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={signOut} className={"gap-2"}>
            <LogOut size={15} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSettings;
