import { object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { LoginBody } from "@/services/auth/type";
import { useLogin } from "@/services/auth";
import useStore from "@/store";

const signInSchema = object({
  email: string().min(1, "Required").email("Invalid Email"),
  password: string()
    .min(1, "Required")
    .min(6, "must be more than 8 characters")
    .max(32, "must be less than 32 characters"),
});
const Login = () => {
  const router = useRouter();
  const { setUserInfo } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    resolver: zodResolver(signInSchema),
  });
  const { isLoading, mutate: login } = useLogin({
    onSuccess: (user) => {
      setUserInfo(user);
      router.push("/");
    },
  });

  const onSubmitHandler: SubmitHandler<LoginBody> = (values) => {
    if (isLoading) return;
    login(values);
  };
  return (
    <>
      <form
        className="max-w-md w-full  min-w-max rounded-xl p-6 shadow-2xl bg-neutral text-neutral-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-center text-3xl font-mono">Login </h1>
        <div className="mt-5 space-y-3 ">
          <p className="text-sm font-extralight ">Enter your Email address</p>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="input input-primary w-full input-md"
            />
            <p className="mt-1 text-red-300 font-semibold  text-sm">
              {errors.email?.message}
            </p>
          </div>
          <p className="text-sm font-extralight">Enter your Password</p>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input input-primary w-full input-md"
            />
            <div className="mt-1 flex justify-between font-semibold text-sm">
              <p className="text-error "> {errors.password?.message}</p>
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
          Login
        </button>
        <div className="mt-3">
          Don`t have an account
          <span
            onClick={() => router.push("/auth/register")}
            className="mx-2 font-bold text-primary-content cursor-pointer underline"
          >
            Create Account
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;
