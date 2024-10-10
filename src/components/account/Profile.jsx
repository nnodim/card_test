import { updateProfile } from "@/api/auth";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/hooks/useAuthStore";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { updateProfileSchema } from "@/validtions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Check, CircleAlert, UserCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
    },
    resolver: zodResolver(updateProfileSchema),
    mode: "all",
  });


  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (data) =>
      await updateProfile(axiosPrivate, data, user?.id),
    onMutate: (newData) => {
      // Optimistically update the user data
      const previousUser = user;
      setUser({ ...user, ...newData });
      return { previousUser };
    },
    onSuccess: () => {
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: "Profile updated successfully",
      });
    },
    onError: (error, newData, context) => {
      // Revert the optimistic update on error
      setUser(context.previousUser);
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
    mutate(data);
  };

  return (
    <div>
      <section className="font-inter w-full p-10 sm:p-20 max-w-7xl mx-auto px-5">
        <div className="flex flex-col w-full max-w-[500px] gap-20">
          <div className="flex items-center gap-4">
            <UserCircle2 className="w-20 h-20" />
            <div className="flex flex-col gap-y-3">
              <h2 className="capitalize text-2xl sm:text-3xl font-semibold font-bricolage">
                {user?.fullName}
              </h2>
              <p className="text-[#24242480]">{user?.email}</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name" className="text-gray-500">
                Name{" "}
                {errors.fullName && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="name"
                name="fullName"
                {...register("fullName", { required: true })}
                type="text"
                className="capitalize"
                placeholder="JOHN DOE S."
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="email" className="text-gray-500">
                Email {errors.email && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="email"
                {...register("email", { required: true })}
                name="email"
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <Button
              type="submit"
              className="bg-primary text-white h-auto text-base rounded-lg"
              disabled={!isDirty || isPending}
            >
              Update
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
