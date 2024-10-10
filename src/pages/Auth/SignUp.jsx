import { registerFn } from "@/api/auth";
import { iconPurple } from "@/assets";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EMAIL_SENT, HOME, LOGIN } from "@/lib/routes";
import { passwordErrors } from "@/lib/utils";
import { registerSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
    onSuccess: ({ user }) => {
      navigate(`${EMAIL_SENT}?email=${encodeURIComponent(user.email)}`);
    },
    onError: (error) => {
      let errorMessage;
      if (!error.response) {
        errorMessage = "No Server Response";
      } else {
        errorMessage = error.response.data.message;
      }
      toast({
        className: "border-0 border-l-4 border-red-500",
        title: (
          <span className="flex items-center gap-2 text-red-500">
            <CircleAlert className="w-4 h-4" />
            Error
          </span>
        ),
        description: errorMessage,
      });
    },
  });

  const onSubmit = (data) => {
    registerUser({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
  };
  return (
    <section className="font-inter flex justify-center items-center w-full p-5">
      <div className="flex flex-col gap-y-6 w-full max-w-[500px]">
        <div className="w-full flex gap-5 items-center mb-5 lg:mb-16">
          <Link to={HOME} className="lg:hidden w-20 sm:w-auto">
            <img src={iconPurple} alt="" className="w-full h-full" />
          </Link>
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold font-bricolage">
              Sign Up
            </h1>
            <p className="text-gray-500">
              Sign up now and access our variety of E-cards and exclusive
              features.{" "}
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 w-full"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-gray-700">
              Name {errors.fullName && <span className="text-red-500">*</span>}
            </label>
            <Input
              id="fullName"
              name="fullName"
              {...register("fullName")}
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-gray-700">
              Email {errors.email && <span className="text-red-500">*</span>}
            </label>
            <Input
              id="email"
              name="email"
              {...register("email")}
              type="text"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="text-gray-700">
              Password{" "}
              {errors.password && <span className="text-red-500">*</span>}
            </label>
            <PasswordInput
              id="password"
              name="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password &&
              errors.password.message === passwordErrors.validationError && (
                <p className="text-red-500 text-xs mt-2 max-w-96 text-justify">
                  {errors.password.message}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password{" "}
              {errors.confirmPassword && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword")}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword &&
              errors.confirmPassword.message ===
                passwordErrors.confirmPasswordError && (
                <p className="text-red-500 text-xs mt-2 max-w-96 text-justify">
                  {errors.confirmPassword.message}
                </p>
              )}
          </div>
          <Button
            className="mt-3 w-full bg-primary rounded-lg textwhite"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin block mx-auto w-10" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <p className="text-gray-500 text-center">
          Already have an account?{" "}
          <Link to={LOGIN} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
