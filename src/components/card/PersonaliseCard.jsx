import { createCard, getCardById } from "@/api/cards";
import useAuthStore from "@/hooks/useAuthStore";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useDataStore } from "@/hooks/useDataStore";
import { LOGIN } from "@/lib/routes";
import { personaliseCardSchema } from "@/validtions/selectCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { AlertCircle, CircleAlert, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useToast } from "../ui/use-toast";
import Stepper from "./Stepper";
import NotFound from "@/pages/NotFound";

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const PersonaliseCard = () => {
  const { toast } = useToast();
  const { info, setInfo, setActiveTab, setIsStep1Completed } = useDataStore();
  const { user } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!user;

  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["card", id],
    queryFn: () => getCardById(id),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["createCard"],
    mutationFn: async (data) => await createCard(data, card.id, axiosPrivate),
    onSuccess: (data) => {
      window.history.pushState(null, "", `/edit/${data.id}`);
      if (!card?.customizable) {
        navigate(`/explore/card/${data.id}/checkout`);
      } else {
        navigate(`/explore/card/${data.id}/preview`);
      }
    },
    onError: (error) => {
      console.log(error);
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(personaliseCardSchema),
    defaultValues: {
      receiverEmail: info?.receiverEmail,
      receiverName: info?.receiverName,
      senderName: info?.senderName,
      addConfetti: info?.addConfetti || true,
      sendDate: info?.sendDate,
      enablePrivateMessage: info?.enablePrivateMessage || false,
    },
  });

  console.log(card);

  const onSubmit = async (data) => {
    setInfo(data);
    setIsStep1Completed(true);

    if (!isLoggedIn) {
      navigate(LOGIN, { state: { from: location } });
      return;
    }

    mutate(data);
    console.log(data);
  };

  useEffect(() => {
    setActiveTab("1");
  }, [setActiveTab]);

  if (isLoading)
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );

  if (isError || !card) return <NotFound text="Card not found" />;
  return (
    <main className="max-w-7xl mx-auto font-inter flex justify-center items-center w-full lg:p-16">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-x-20 gap-y-8 sm:gap-y-16 mb-10 items-center">
        <Stepper card={card} />
        <div>
          <div className="flex flex-col text-center justify-center items-center w-full px-5">
            <h1 className="text-2xl md:text-5xl font-semibold font-bricolage">
              Personalise your Card
            </h1>
            <p className="my-5 md:text-xl text-center">
              Enter the details for both the receiver and sender, and set up the
              delivery option.
            </p>
          </div>
          {card?.customizable && (
            <p className="p-4 bg-[#E8F4FD] w-fit mx-auto text-[#4F4F4F] text-sm rounded-xl flex items-center justify-center gap-3">
              <AlertCircle className="w-6 h-6 " />
              <span>You can customise your design on the next page.</span>
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-x-[72px] gap-y-5 md:gap-y-16 mt-5 sm:mt-14 w-full">
            <div className="bg-[#F7F5FF] sm:bg-inherit w-full flex items-center justify-center px-5 py-8 sm:pr-0 sm:pl-5">
              <div className=" h-full w-full animate-in fade-in-5 flex flex-col max-w-96 md:max-w-[350px]">
                <div className="bg-white w-full h-full flex flex-col items-center justify-center gap-y-6 sm:border sm:border-[#4F4F4F] shadow-lg">
                  <div className="w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={card?.url}
                      alt={card?.name}
                    />
                  </div>
                  {/* <p>Thank you</p> */}
                </div>
                <Link className="text-primary mt-4 w-full" to="/explore">
                  Change card design
                </Link>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5 w-full max-w-md p-4"
            >
              <h3 className="font-medium text-xl">
                Who will receive this card?
              </h3>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="receiverName" className="text-gray-700">
                  Name{" "}
                  {errors.receiverName && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <Input
                  id="receiverName"
                  {...register("receiverName")}
                  name="receiverName"
                  type="text"
                  placeholder="Enter the receiver's name"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="receiverEmail" className="text-gray-700">
                  Email{" "}
                  {errors.receiverEmail && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <Input
                  {...register("receiverEmail")}
                  id="receiverEmail"
                  name="receiverEmail"
                  type="receiverEmail"
                  placeholder="Enter the reciever's email"
                />
              </div>
              <h3 className="font-medium text-xl">Who is sending this card?</h3>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="senderName" className="text-gray-700">
                  Name{" "}
                  {errors.senderName && <span className="text-red-500">*</span>}
                </label>
                <Input
                  id="senderName"
                  {...register("senderName")}
                  name="senderName"
                  type="text"
                  placeholder="Enter the sender's name"
                />
              </div>

              <h3 className="font-medium text-xl">
                When should the receiver get the e-card?
              </h3>

              <div className="flex flex-col gap-y-3 w-full">
                <p className="text-[#333333] font-light text-xs">
                  Date is based on your local time
                </p>
                <Controller
                  name="sendDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      showNow={false}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date ? date.toDate() : null);
                      }}
                      showTime={{
                        format: "H:mm",
                        disabledTime: (current) => {
                          if (
                            current &&
                            dayjs(current).isSame(dayjs(), "day")
                          ) {
                            const currentHour = dayjs().hour();
                            const currentMinute = dayjs().minute();
                            return {
                              disabledHours: () => range(0, currentHour + 1),
                              disabledMinutes: (selectedHour) => {
                                if (selectedHour === currentHour + 1) {
                                  return range(0, currentMinute + 1);
                                }
                                return [];
                              },
                            };
                          }
                          return {};
                        },
                      }}
                      disabledDate={(date) =>
                        date && date < dayjs().startOf("day")
                      }
                      placeholder="Select date and time"
                      className="text-primary font-lexend h-10 px-3 shadow-input hover:border-primary border focus-within:border-primary"
                      format={"DD/MM/YYYY   H:mm A"}
                    />
                  )}
                />
              </div>

              <h3 className="font-medium text-xl">Card Setup</h3>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-4">
                  <label
                    htmlFor="addConfetti"
                    className="block text-sm leading-6 text-[#333333] font-light"
                  >
                    Celebrate with Confetti
                  </label>
                  <Controller
                    control={control}
                    name="addConfetti"
                    render={({ field }) => (
                      <Switch
                        id="addConfetti"
                        name="addConfetti"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-x-4">
                  <label
                    htmlFor="messages"
                    className="block text-sm leading-6 text-[#333333] font-light"
                  >
                    Enable Private Messages
                  </label>
                  <Controller
                    control={control}
                    name="enablePrivateMessage"
                    render={({ field }) => (
                      <Switch
                        id="messages"
                        name="enablePrivateMessage"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <Button className="mt-8 w-full h-auto text-base/6 font-normal bg-primary rounded-lg py-[18px] text-white">
                {isPending ? (
                  <Loader2 className="animate-spin block mx-auto w-10" />
                ) : (
                  "Proceed"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
