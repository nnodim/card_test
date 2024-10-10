import { verifyEmail } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: verifyEmail,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      mutate({ token });
    };

    handleVerifyEmail();
  }, [token, navigate, mutate]);

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-150px)]">
      {isPending ? (
        <div className="loader font-bricolage text-primary"></div>
      ) : isError ? (
        <p className="text-red-500 font-medium">Something went wrong</p>
        
      ) : (
        isSuccess && (
          <div>
            <p className="text-primary font-medium">Email verified</p>
            <p className="text-primary font-medium">Redirecting...</p>
          </div>
        )
      )}
    </div>
  );
};
