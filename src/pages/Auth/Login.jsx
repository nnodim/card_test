import { loginFn, verifyTwoFactorFn } from "@/api/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { OtpForm } from "@/components/auth/OtpForm";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/hooks/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const { toast } = useToast();
  const { setUser, setTokens } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    setTokens(data.tokens);
    navigate(from, { replace: true });
  };

  const handleError = (error) => {
    let errorMessage = error.response?.data?.message || "An error occurred";
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
  };

  const { mutate: loginUser, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
    onSuccess: (data) => {
      if (data.requiresTwoFactor) {
        setShowTwoFactor(true);
        setUserId(data.userId);
        toast({
          title: "Two-Factor Authentication Required",
          description: "Please enter the code sent to your email.",
        });
      } else {
        handleLoginSuccess(data);
      }
    },
    onError: (error) => {
      handleError(error);
      if (
        error.response?.status === 401 &&
        error.response?.data?.message.includes("Email not verified")
      ) {
        navigate(`/email-sent?email=${encodeURIComponent(error.response.data.email)}`);
      }
    },
  });

  const { mutate: verifyTwoFactor, isPending: isTwoFactorPending } =
    useMutation({
      mutationKey: ["verifyTwoFactor"],
      mutationFn: verifyTwoFactorFn,
      onSuccess: handleLoginSuccess,
      onError: handleError,
    });

  const onSubmitLogin = (data) => {
    loginUser(data);
  };

  const onSubmitTwoFactor = (data) => {
    verifyTwoFactor({ userId, twoFactorCode: data.twoFactorCode });
  };

  return (
    <section className="font-inter flex justify-center items-center w-full p-5">
      {!showTwoFactor ? (
        <LoginForm onSubmit={onSubmitLogin} isPending={isLoginPending} />
      ) : (
        <OtpForm
          onSubmit={onSubmitTwoFactor}
          isPending={isTwoFactorPending}
          userId={userId}
        />
      )}
    </section>
  );
};
