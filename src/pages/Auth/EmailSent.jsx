import { resendEmail } from "@/api/auth";
import { envelope } from "@/assets";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Check, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTimer } from "react-timer-hook";

export const EmailSent = () => {
  const { toast } = useToast();
  const expiryTimestamp = new Date(Date.now() + 1000 * 60 * 1);
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const { mutate: resendVerificationEmail, isPending } = useMutation({
    mutationKey: ["resendVerificationEmail"],
    mutationFn: resendEmail,
    onSuccess: () => {
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: "Email sent successfully",
      });
      restart(expiryTimestamp);
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
        description: error.response?.data?.message || "An error occurred",
      });
    },
  });

  const handleResendEmail = () => {
    if (!isRunning && email) {
      resendVerificationEmail({ email });
    }
  };

  return (
    <section className="font-inter flex justify-center items-center w-full p-5">
      <div className="flex flex-col gap-y-16 w-full max-w-[600px]">
        <h1 className="text-[40px] font-medium text-primary font-bricolage">
          A mail has been sent to you
        </h1>
        <div className="flex flex-col gap-y-16 items-center">
          <p>
            A verification link has been sent to your registered mail. Kindly
            follow the link to proceed to your account.
          </p>
          <img src={envelope} alt="yellow mail envelope" />
        </div>

        <div className="mt-8 flex gap-x-1.5 items-center text-sm">
          <p className="">Didn&apos;t get a mail?</p>
          <Button
            disabled={isRunning || !email || isPending}
            onClick={handleResendEmail}
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
    </section>
  );
};
