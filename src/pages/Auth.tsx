import CardContainer from "@/components/containers/CardContainer";
import SignInForm from "@/components/forms/SignInForm";
import SignUpForm from "@/components/forms/SignUpForm";
import Social from "@/components/forms/Social";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate("/main");
    }
  }, [auth]);

  return (
    <article className={"grid md:grid-cols-2 grid-cols-1 w-full h-screen"}>
      <section className={"bg-slate-950 hidden md:block"}></section>
      <section className={"mx-auto mt-20 px-4 md:px-8"}>
        <Tabs defaultValue={"signIn"}>
          <TabsList className={"grid grid-cols-2 gap-2"}>
            <TabsTrigger value={"signUp"}>Sign Up</TabsTrigger>
            <TabsTrigger value={"signIn"}>Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value={"signUp"}>
            <CardContainer
              title={"Create an account."}
              footer={<Social />}
              footerClassName={"flex-col"}
            >
              <SignUpForm />
            </CardContainer>
          </TabsContent>
          <TabsContent value={"signIn"}>
            <CardContainer
              title={"Sign In"}
              footer={<Social />}
              footerClassName={"flex-col"}
            >
              <SignInForm />
            </CardContainer>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
};

export default Auth;
