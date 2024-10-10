import { getPurchasedCard, updateCard } from "@/api/cards";
import { PurchaseCadrdImg } from "@/components/PurchaseCadrdImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/hooks/useAuthStore";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { LOGIN } from "@/lib/routes";
import { personaliseCardSchema } from "@/validtions/selectCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { AlertCircle, CircleAlert, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const EditCard = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { purchaseId } = useParams();
    const location = useLocation();

  const { data: card, isLoading, isError } = useQuery({
    queryKey: ["purchasedCard", purchaseId],
    queryFn: () => getPurchasedCard(purchaseId, axiosPrivate),
    enabled: !!purchaseId,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCard"],
    mutationFn: async (data) => await updateCard(data, card.id, axiosPrivate),
    onSuccess: () => {
      if (!card?.card?.customizable && card?.paymentStatus === "PENDING") {
        navigate(`/explore/card/${card?.id}/checkout`);
      } else if (card?.card?.customizable) {
        navigate(`/explore/card/${card?.id}/preview`);
      } else {
        navigate(`/account/my-cards`);
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
  });
  const onSubmit = async (data) => {
    mutate(data);
  };
  
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !card) return <NotFound text="Card not found" />;
  
  if (!user) return <Navigate to={LOGIN} state={{ from: location }} replace />;
  return (
    <main className="w-full max-w-5xl mx-auto flex flex-col justify-center items-center my-10">
      <div className="flex flex-col text-center justify-center items-center w-full px-5">
        <h1 className="text-2xl md:text-5xl font-semibold font-bricolage">
          Edit card for {card?.receiverName}
        </h1>
        <p className="my-5 md:text-xl text-center">
          Enter the receiver details and configure the delivery methods to send
          cards to receiver or for signing by your other friends
        </p>
        {card?.sent && (
          <p className="p-4 bg-[#E8F4FD] w-fit mx-auto text-[#4F4F4F] text-sm rounded-xl flex items-center justify-center gap-3">
            <AlertCircle className="w-6 h-6 " />
            <span>You can not edit a card that has been sent</span>
          </p>
        )}
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
              <div className="w-full relative">
                <PurchaseCadrdImg card={card} />
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 w-full max-w-md p-4"
        >
          <h3 className="font-medium text-xl">Who will receive this card?</h3>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="receiverName" className="text-gray-700">
              Name{" "}
              {errors.receiverName && <span className="text-red-500">*</span>}
            </label>
            <Input
              id="receiverName"
              {...register("receiverName")}
              name="receiverName"
              defaultValue={card?.receiverName}
              type="text"
              disabled={card?.sent}
              placeholder="Enter the receiver's name"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="receiverEmail" className="text-gray-700">
              Email{" "}
              {errors.receiverEmail && <span className="text-red-500">*</span>}
            </label>
            <Input
              {...register("receiverEmail")}
              id="receiverEmail"
              name="receiverEmail"
              type="receiverEmail"
              disabled={card?.sent}
              defaultValue={card?.receiverEmail}
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
              disabled={card?.sent}
              defaultValue={card?.senderName}
              placeholder="Enter the reciever's sender"
            />
          </div>

          <h3 className="font-medium text-xl">
            When should the receiver get the e-card?
          </h3>
          {/* <div className="flex gap-8 items-center">
            <div className="flex flex-col gap-y-5">
              <div className="flex items-center gap-x-2">
                <Controller
                  name="sendInstantly"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="sendNow"
                      type="radio"
                      {...field}
                      onChange={() => {
                        field.onChange(true);
                        setIsSendLater(false);
                      }}
                      checked={field.value === true}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-pritext-primary"
                    />
                  )}
                />
                <label
                  htmlFor="sendNow"
                  className="block text-sm leading-6 text-[#333333] font-light text-nowrap"
                >
                  Send Now
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <Controller
                  name="sendInstantly"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="sendLater"
                      type="radio"
                      {...field}
                      onChange={() => {
                        field.onChange(false);
                        setIsSendLater(true);
                      }}
                      checked={field.value === false}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-pritext-primary"
                    />
                  )}
                />
                <label
                  htmlFor="sendLater"
                  className="block text-sm leading-6 text-[#333333] font-light text-nowrap"
                >
                  Send Later
                </label>
              </div>
            </div>
            <div
              className={`w-full relative flex gap-4 py-5 px-3 bg-[#389efb] rounded-lg text-white after:content-[' '] after:absolute ${
                isSendLater ? "after:top-[67px]" : "after:top-3"
              } after:-left-1 after:bg-[#389efb] after:h-4 after:w-4 after:rotate-[-45deg]`}
            >
              <span>
                <AlertCircle className="w-6 h-6" />
              </span>
              <p className="text-xs font-medium">
                {isSendLater
                  ? "Selecting “Send Later” means after payment, you will be sending the e-card to the receiver at a later date that you have set."
                  : "Selecting “Send Now” means after payment, you will be sending the e-card to the receiver immediately."}
              </p>
            </div>
          </div> */}

          <div className="flex flex-col gap-y-3 w-full">
            <p className="text-[#333333] font-light text-xs">
              Date is based on your local time
            </p>
            <Controller
              name="sendDate"
              control={control}
              defaultValue={new Date(card?.sendDate)}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  disabled={card?.sent}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.toDate() : null);
                  }}
                  showNow={false}
                  showTime={{
                    format: "H:mm",
                    disabledTime: (current) => {
                      if (current && dayjs(current).isSame(dayjs(), "day")) {
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
                  disabledDate={(date) => date && date < dayjs().startOf("day")}
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
                defaultValue={card?.addConfetti}
                render={({ field }) => (
                  <Switch
                    id="addConfetti"
                    name="addConfetti"
                    disabled={card?.sent}
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
                defaultValue={card?.enablePrivateMessage}
                name="enablePrivateMessage"
                render={({ field }) => (
                  <Switch
                    id="messages"
                    disabled={card?.sent}
                    name="enablePrivateMessage"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isPending || card?.sent}
            className="mt-8 w-full h-auto text-base/6 font-normal bg-primary rounded-lg py-[18px] text-white"
          >
            {isPending ? (
              <Loader2 className="animate-spin block mx-auto w-10" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
};
