import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { server } from "@/config/keys";

const Social = () => {
  return (
    <>
      <section className={"pb-4 w-full"}>
        <Separator className={"flex justify-center items-center"}>
          <span
            className={
              "text-xs text-muted-foreground bg-primary-foreground text-center -translate-y-0.5"
            }
          >
            or continue with
          </span>
        </Separator>
      </section>
      <section className={"space-x-2"}>
        <Button variant={"outline"} className={"gap-2"}>
          <FcGoogle />
          <a href={`${server.url}/api/auth/google`}>Google</a>
        </Button>
        <Button variant={"outline"} className={"gap-2"}>
          <FaFacebook color={"blue"} />
          <a href={`${server.url}/api/auth/facebook`}>Facebook</a>
        </Button>
      </section>
    </>
  );
};

export default Social;
