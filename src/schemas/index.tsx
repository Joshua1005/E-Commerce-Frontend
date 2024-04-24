import { object, string } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

const signUpSchema = object({
  firstName: string().min(1, { message: "First name is required." }),
  middleName: string().optional(),
  lastName: string().min(1, { message: "Last name is required." }),
  email: string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email format." }),
  password: string()
    .min(8, {
      message: "Password must contain atleast 8 characters.",
    })
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, a special character and a number.",
    }),
  confirmPassword: string(),
}).refine((value) => value.password === value.confirmPassword, {
  message: "Confirm password and password must matched.",
  path: ["confirmPassword"],
});

const signInSchema = object({
  email: string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email format." }),
  password: string().min(1, { message: "Password is required." }),
});

export { signUpSchema, signInSchema };
