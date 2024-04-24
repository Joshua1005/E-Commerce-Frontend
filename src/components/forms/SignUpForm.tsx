import { signUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldContainer from "@/components/containers/FormFieldContainer";
import { Button } from "@/components/ui/button";
import useSignUp from "@/hooks/useSignUp";
import FormError from "@/components/forms/FormError";
import FormSuccess from "@/components/forms/FormSuccess";

const SignUpForm = () => {
  const { loading, errorMessage, successMessage, signUp } = useSignUp();
  const form = useForm<Zod.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(signUp)}
        className={"grid grid-cols-2 gap-2"}
      >
        <FormFieldContainer
          name={"firstName"}
          control={form.control}
          className={"col-span-2"}
        />
        <FormFieldContainer
          name={"middleName"}
          control={form.control}
          placeholder={"(Optional)"}
        />
        <FormFieldContainer name={"lastName"} control={form.control} />
        <FormFieldContainer
          name={"email"}
          control={form.control}
          type={"email"}
          className={"col-span-2"}
        />
        <FormFieldContainer
          name={"password"}
          control={form.control}
          type={"password"}
        />
        <FormFieldContainer
          name={"confirmPassword"}
          control={form.control}
          type={"password"}
        />
        <Button disabled={loading} type={"submit"} className={"col-span-2"}>
          {loading ? (
            <div
              className={
                "size-5 border-r-primary-foreground border-r-2 rounded-full animate-spin"
              }
            />
          ) : (
            "Sign Up"
          )}
        </Button>
        {errorMessage && (
          <FormError message={errorMessage} className={"col-span-2"} />
        )}
        {successMessage && (
          <FormSuccess message={successMessage} className={"col-span-2"} />
        )}
      </form>
    </Form>
  );
};

export default SignUpForm;
