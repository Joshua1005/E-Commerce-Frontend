import { signInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldContainer from "@/components/containers/FormFieldContainer";
import { Button } from "@/components/ui/button";
import useSignIn from "@/hooks/useSignIn";
import FormError from "@/components/forms/FormError";

const SignInForm = () => {
  const { errorMessage, loading, signIn } = useSignIn();
  const form = useForm<Zod.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signIn)} className={"grid gap-2"}>
        <FormFieldContainer
          control={form.control}
          name={"email"}
          type={"email"}
        />
        <FormFieldContainer
          control={form.control}
          name={"password"}
          type={"password"}
        />
        <Button disabled={loading}>Sign In</Button>
        {errorMessage && <FormError message={errorMessage} />}
      </form>
    </Form>
  );
};

export default SignInForm;
