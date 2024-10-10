import { forgotPasswordFn } from "@/api/auth";
import { iconPurple } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EMAIL_SENT, HOME } from "@/lib/routes";
import { forgotPasswordSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: forgotPasswordFn,
    onSuccess: () => {
      navigate(EMAIL_SENT);
    },
    onError: (error) => {
      toast({
        className: "border-0 border-l-4 border-red-500",
        title: (
          <span className="flex items-center gap-2 text-red-500">
            <CircleAlert className="w-4 h-4" />
            Error
          </span>
        ),
        description: error.response.data.message,
      });
    },
  });

  const onSubmit = (data) => {
    forgotPassword(data);
  };

  return (
    <section className="font-inter flex justify-center items-center w-full p-5">
      <div className="flex flex-col w-full max-w-[500px]">
        <div className="w-full flex gap-5 items-center mb-8 lg:mb-16">
          <Link to={HOME} className="lg:hidden w-20 sm:w-auto">
            <img src={iconPurple} alt="logo" className="w-full h-full" />
          </Link>
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold font-bricolage">
              Forgot Password
            </h1>
            <p className="text-gray-500">Kindly enter your email</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-gray-700">
              Email {errors.email && <span className="text-red-500">*</span>}
            </label>
            <Input
              id="email"
              name="email"
              {...register("email")}
              type="email"
              placeholder="Enter your Email"
            />
          </div>
          <Button
            className="mt-16 w-full bg-primary rounded-lg textwhite"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin block mx-auto w-10" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};
