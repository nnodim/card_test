import { Check, CircleAlert } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { updateProfile } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import useAuthStore from "@/hooks/useAuthStore";

export const TwoFactorSwitch = () => {
  const { user, setUser } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(user?.twoFactorEnabled || false);

  const { mutate: updateTwoFactorSetting, isPending } = useMutation({
    mutationKey: ["updateTwoFactor"],
    mutationFn: async (enabled) =>
      await updateProfile(
        axiosPrivate,
        { twoFactorEnabled: enabled },
        user?.id
      ),
    onSuccess: (data) => {
      setUser({ ...user, twoFactorEnabled: data.twoFactorEnabled });
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: `Two-factor authentication ${
          data.twoFactorEnabled ? "enabled" : "disabled"
        } successfully`,
      });
    },
    onError: (error) => {
      setIsEnabled(!isEnabled); // Revert the switch state
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
    },
  });

  const handleToggle = () => {
    const newEnabledState = !isEnabled;
    setIsEnabled(newEnabledState);
    updateTwoFactorSetting(newEnabledState);
  };
  return (
    <div className="bg-[#7C4CFF14] w-full rounded-xl px-5 md:px-10 py-5">
      <div className="flex items-start gap-[10px]">
        <Switch
          id="airplane-mode"
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
        <Label htmlFor="airplane-mode" />
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Two-factor Authentication</h1>
          <p className="text-[12px] text-[#10101066]">
            When you log in, you will be required to enter a code that wil be
            sent to your device.
          </p>
        </div>
      </div>
    </div>
  );
};
