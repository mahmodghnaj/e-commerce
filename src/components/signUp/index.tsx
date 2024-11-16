import { useState } from "react";
import { TypeOf, object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterBody } from "@/services/auth/type";
import { useRegister } from "@/services/auth";
import { useRouter } from "next/router";
import useStore from "@/store";

const signUpSchema = object({
  firstName: string().min(1, "Required"),
  lastName: string().min(1, "Required"),
  email: string().min(1, "Required").email("Invalid"),
  password: string()
    .min(1, "Required")
    .min(8, "Must be more than 8 characters")
    .max(32, "Must be less than 32 characters"),
  confirmPassword: string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords don't match",
});
export type signUpInput = TypeOf<typeof signUpSchema>;

const signUp = () => {
  const router = useRouter();
  const { setUserInfo } = useStore();
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const { isLoading, mutate: sign_Up } = useRegister({
    onSuccess: (user) => {
      setUserInfo(user);
      router.push("/");
    },
    onError: (error) => {
      if (error) {
        setGeneralError("Email is Ready Found");
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmitHandler: SubmitHandler<RegisterBody> = (values) => {
    if (isLoading) return;
    setGeneralError("");
    sign_Up(values);
  };

  return (
    <>
      <form
        className="max-w-md w-full min-w-max rounded-xl p-6 shadow-2xl bg-neutral text-neutral-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-center text-3xl font-mono">Sign Up</h1>

        {generalError && (
          <p className="mt-3 text-red-500 font-semibold text-center">
            {generalError}
          </p>
        )}

        <div className="mt-5 md:space-y-3 xs:space-y-1">
          <div className="grid md:grid-cols-2 xs:grid-cols-1 md:gap-3 xs:gap-1">
            <div>
              <p className="text-sm font-extralight">Enter your First Name</p>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="input md:mt-3 xs:mt-1 input-primary w-full input-md"
              />
              <p className="mt-1 text-red-300 font-semibold text-sm">
                {errors.firstName?.message}
              </p>
            </div>
            <div>
              <p className="text-sm font-extralight">Enter your Last Name</p>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="input md:mt-3 xs:mt-1 input-primary w-full input-md"
              />
              <p className="mt-1 text-red-300 font-semibold text-sm">
                {errors.lastName?.message}
              </p>
            </div>
          </div>
          <p className="text-sm font-extralight">Enter your Email address</p>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="input input-primary w-full input-md"
            />
            <p className="mt-1 text-red-300 font-semibold text-sm">
              {errors.email?.message}
            </p>
          </div>
          <div className="grid md:grid-cols-2 xs:grid-cols-1 md:gap-3 xs:gap-1">
            <div>
              <p className="text-sm font-extralight">Enter your Password</p>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="md:mt-3 xs:mt-1 input input-primary w-full input-md"
              />
              <p className="mt-1 text-red-300 font-semibold text-sm">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <p className="text-sm font-extralight">Confirm Password</p>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="md:mt-3 xs:mt-1 input input-primary w-full input-md"
              />
              <p className="mt-1 text-red-300 font-semibold text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`mt-6 btn btn-primary w-full ${
            isLoading && "no-animation"
          }`}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Sign Up
        </button>
        <div className="md:mt-3 xs:mt-1">
          Have An Account?
          <span
            onClick={() => router.push("/auth/login")}
            className="mx-2 font-bold text-primary-content cursor-pointer underline"
          >
            Login
          </span>
        </div>
      </form>
    </>
  );
};

export default signUp;
