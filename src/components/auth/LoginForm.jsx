import { FORGOT_PASSWORD, HOME, SIGNUP } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { PasswordInput } from "../PasswordInput";
import { Input } from "../ui/input";
import { iconPurple } from "@/assets";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";

export const LoginForm = ({ onSubmit, isPending }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex flex-col w-full max-w-[500px]">
      <div className="w-full flex gap-5 items-center mb-8 lg:mb-16">
        <Link to={HOME} className="lg:hidden w-20 sm:w-auto">
          <img src={iconPurple} alt="" className="w-full h-full" />
        </Link>
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold font-bricolage">
            Login
          </h1>
          <p className="text-gray-500">Kindly enter your details</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            {...register("email")}
            placeholder="Enter your email"
            className={errors.email && "border-red-500"}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            {...register("password")}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <Link to={FORGOT_PASSWORD} className="text-primary self-end">
          Forgot Password?
        </Link>
        <Button
          className="mt-16 w-full bg-primary rounded-lg text-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin block mx-auto w-10" />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="text-gray-500 mt-8 text-center">
        Don&apos;t have an account?{" "}
        <Link to={SIGNUP} className="text-primary">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool,
};
