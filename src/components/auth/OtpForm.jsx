import { resendOtpFn } from "@/api/auth";
import { iconPurple } from "@/assets";
import { HOME } from "@/lib/routes";
import { twoFactorSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useToast } from "../ui/use-toast";

export const OtpForm = ({ onSubmit, isPending, userId }) => {
  const { toast } = useToast();
  const expiryTimestamp = new Date(Date.now() + 1000 * 60 * 1);
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(twoFactorSchema),
  });

  const { mutate, isPending: isResendPending } = useMutation({
    mutationKey: ["resent-otp"],
    mutationFn: resendOtpFn,
    onSuccess: () => {
      restart(expiryTimestamp);
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: "OTP sent successfully",
      });
    },
  });

  const onResend = () => {
    mutate({ userId });
  };

  return (
    <div className="flex flex-col w-full max-w-[500px]">
      <div className="w-full flex gap-5 items-center mb-8 lg:mb-16">
        <Link to={HOME} className="lg:hidden w-20 sm:w-auto">
          <img src={iconPurple} alt="" className="w-full h-full" />
        </Link>
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold font-bricolage">
            Enter OTP
          </h1>
          <p className="text-gray-500">
            Kindly enter the code sent to your email
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="twoFactorCode" className="text-gray-700 sr-only">
            Enter Code
          </label>
          <Controller
            name="twoFactorCode"
            control={control}
            render={({ field }) => (
              <InputOTP maxLength={6} {...field} className="w-full">
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>
        <Button
          className="mt-4 lg:mt-8 w-full max-w-xs bg-primary rounded-lg text-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin block mx-auto w-10" />
          ) : (
            "Verify"
          )}
        </Button>
      </form>

      <div className="mt-8 flex gap-x-1.5 items-center text-sm">
        <p className="">Didn&apos;t get a mail?</p>
        <Button
          disabled={isRunning || isResendPending}
          onClick={onResend}
          type="button"
          className="text-primary hover:no-underline p-0"
          variant="link"
        >
          Resend.
        </Button>
        {isRunning && (
          <div className="text-[#BDBDBD]">
            {minutes.toString().padStart(2, "0")} :{" "}
            {seconds.toString().padStart(2, "0")}
          </div>
        )}
      </div>
    </div>
  );
};

OtpForm.propTypes = {
  onSubmit: PropTypes.func,
  userId: PropTypes.string,
  isPending: PropTypes.bool,
};
