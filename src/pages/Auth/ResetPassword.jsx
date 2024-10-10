import { resetPasswordFn } from "@/api/auth";
import { iconPurple } from "@/assets";
import { PasswordInput } from "@/components/PasswordInput";
import PasswordMeter from "@/components/PasswordMeter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { HOME, LOGIN } from "@/lib/routes";
import { passwordErrors } from "@/lib/utils";
import { resetPasswordSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPasswordFn,
    onSuccess: () => {
      navigate(LOGIN);
    },
    onError: (err) => {
      toast({
        className: "border-0 border-l-4 border-red-500",
        title: (
          <span className="flex items-center gap-2 text-red-500">
            <CircleAlert className="w-4 h-4" />
            Error
          </span>
        ),
        description: err.response.data.message,
      });
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
  });

  const watchPassword = watch("password", "");

  const onSubmit = (data) => {
    mutate({ ...data, token });
  };

  useEffect(() => {
    if (!token) {
      navigate(LOGIN);
      return;
    }
  }, [token, navigate]);

  return (
    <section className="font-inter flex justify-center items-center w-full p-5">
      <div className="flex flex-col w-full max-w-[500px]">
        <div className="w-full flex gap-5 items-center mb-8 lg:mb-16">
          <Link to={HOME} className="lg:hidden w-20 sm:w-auto">
            <img src={iconPurple} alt="" className="w-full h-full" />
          </Link>
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold font-bricolage">
              Reset Password
            </h1>
            <p className="text-gray-500">
              Kindly create and confirm your password
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <div className="flex flex-col w-full gap-y-5">
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="text-gray-700">
                  Password{" "}
                  {errors.password && <span className="text-red-500">*</span>}
                </label>
                <PasswordInput
                  id="password"
                  {...register("password")}
                  name="password"
                  placeholder="Enter your password"
                />
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
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                />
              </div>
              {errors.confirmPassword &&
                errors.confirmPassword.message ===
                  passwordErrors.confirmPasswordError && (
                  <p className="text-red-500 text-xs max-w-96 text-justify">
                    {errors.confirmPassword.message}
                  </p>
                )}
            </div>
            <PasswordMeter password={watchPassword} />
          </div>
          <Button
            className="mt-16 w-full bg-primary rounded-lg textwhite"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin block mx-auto w-10" />
            ) : (
              "Create New Password"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};
