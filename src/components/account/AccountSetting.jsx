import { updateProfile } from "@/api/auth";
import useAuthStore from "@/hooks/useAuthStore";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import useLogout from "@/hooks/useLogout";
import { LOGIN } from "@/lib/routes";
import { updatePasswordSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Check, CircleAlert, LogOut, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../PasswordInput";
import PasswordMeter from "../PasswordMeter";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { TwoFactorSwitch } from "./TwoFactorSwitch";

const AccountSetting = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const logout = useLogout();
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "all",
    resolver: zodResolver(updatePasswordSchema),
  });
  const watchPassword = watch("password", "");

  const { mutate: updatePasswordMutation, isPending } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async (data) =>
      await updateProfile(axiosPrivate, data, user?.id),
    onSuccess: () => {
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: "Password updated successfully",
      });
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
    updatePasswordMutation({
      currentPassword: data.currentPassword,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="mb-10 max-w-5xl mx-auto mt-11">
      <div className="flex mb-2 px-5 lg:p-0">
        <h4 className="text-[#A5A5A5] font-bricolage">Password</h4>
      </div>
      <div className="flex flex-col lg:flex-row gap-20 items-start w-full">
        <div className="flex justify-between w-full max-w-4xl flex-col gap-8 mx-auto">
          <div className="bg-[#7C4CFF14] w-full py-8 px-5 rounded-xl">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full max-w-xl gap-16">
                <div className="flex md:items-start gap-4 md:flex-row flex-col">
                  <div className="flex flex-col w-full max-w-sm gap-4">
                    <div>
                      <PasswordInput
                        className="bg-[#7C4CFF12] rounded-lg h-auto py-4 pl-5"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        {...register("currentPassword")}
                      />
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <PasswordInput
                        className="bg-[#7C4CFF12] rounded-lg h-auto py-4 pl-5"
                        id="password"
                        name="password"
                        placeholder="New Password"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <PasswordInput
                        className="bg-[#7C4CFF12] rounded-lg h-auto py-4 pl-5"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <PasswordMeter password={watchPassword} />
                </div>
                <Button
                  disabled={isPending}
                  className="flex self-end justify-center w-fit items-center py-5 px-8 h-auto bg-primary rounded-lg text-white text-base"
                  type="submit"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
          <TwoFactorSwitch />

          <hr className="border-t-2 border-gray-300 w-full max-w-2xl mx-auto" />

          <div className="flex flex-col gap-[10px] lg:flex-row justify-between bg-[#FC57571A] w-full px-5 md:px-10 py-5 rounded-xl">
            <div className="flex items-start gap-[10px] w-full max-w-md">
              <Trash2 className="rounded-full flex-shrink-0 p-2 w-10 h-10 bg-[#FC57571A] text-[#FC5757]" />
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-semibold">Deactivate Account</h3>
                <p className="text-[12px] text-[#10101066]">
                  When you log in, you will be redirected to enter a code that
                  will be sent to your device
                </p>
              </div>
            </div>
            <Button
              className="border-[#FC5757] self-end h-auto border bg-[#FC5757] hover:bg-white hover:text-[#FC5757] text-white rounded-lg text-base py-5 px-8"
              type="submit"
            >
              Deactivate Account
            </Button>
          </div>
        </div>
        <Button
          className="h-auto py-5 px-14 hover:bg-[#FC5757] hover:text-white border-[#FC5757] border bg-white text-[#FC5757] rounded-lg self-center lg:self-start text-base"
          type="button"
          onClick={async () => {
            await logout();
            navigate(LOGIN, { replace: true });
          }}
        >
          <LogOut className="mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default AccountSetting;
