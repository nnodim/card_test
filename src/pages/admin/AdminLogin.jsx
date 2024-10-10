import { adminLoginFn } from "@/api/auth";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/hooks/useAuthStore";
import { loginSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function AdminLogin() {
  const { toast } = useToast();
  const { setUser, setTokens } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginUser, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: adminLoginFn,
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.tokens);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      let errorMessage;
      if (!error.response) {
        errorMessage = "No server response";
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
    loginUser(data);
  };

  return (
    <div className="font-bricolage min-h-screen flex flex-col">
      <img
        src="https://cdn.hashnode.com/res/hashnode/image/upload/v1724143689225/3f4cc19d-6a3a-4b05-8679-e05e722ebb70.png"
        alt="Logo"
        className="w-[116px] m-6"
      />
      <div className="flex items-center justify-center h-[calc(100vh-116px)] w-full">
        <div className="flex flex-col gap-16 bg-[#7C4CFF0F] p-8 rounded-md shadow-md w-full max-w-md">
          <div>
            <h2 className="text-[40px]/[46px] font-semibold text-gray-800">
              Admin Log in
            </h2>
            <p className="text-gray-500 mt-3">Kindly enter your details</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* Attach handleSubmit */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-[#333] mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                {...register("email")}
                placeholder="Enter your email"
                className={`w-full bg-inherit border-[#D0D5DD] ${
                  errors.email && "border-red-500"
                }`}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block text-[#333] mb-2">
                Password
              </label>
              <PasswordInput
                id="password"
                name="password"
                {...register("password")}
                placeholder="Enter your password"
                className={`w-full bg-inherit border-[#D0D5DD] ${
                  errors.password && "border-red-500"
                }`}
              />
            </div>
            <div className="text-right">
              <a
                href="/admin-forget-password"
                className="text-primary hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="mt-16 w-full text-base h-auto bg-primary text-white py-3 rounded-md"
            >
              {isPending ? (
                <Loader2 className="animate-spin block mx-auto w-10" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
