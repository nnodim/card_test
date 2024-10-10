import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, CircleAlert, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { checkActiveBundle } from "@/api/bundle";
import { getPriceForCard, getPurchasedCard, purchaseCard } from "@/api/cards";
import useAuthStore from "@/hooks/useAuthStore";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useDataStore } from "@/hooks/useDataStore";
import { LOGIN } from "@/lib/routes";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useToast } from "../ui/use-toast";
import Stepper from "./Stepper";
import { PurchaseCadrdImg } from "../PurchaseCadrdImg";
import NotFound from "@/pages/NotFound";
import { formatPrice } from "@/lib/utils";

export const Checkout = () => {
  const { setActiveTab } = useDataStore();
  const [currency, setCurrency] = useState("NGN");
  const { user } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();
  const [delivery, setDelivery] = useState("group");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { id: purchaseId } = useParams();

  const { data: isBundleActive, isLoading: isBundleActiveLoading } = useQuery({
    queryKey: ["checkActiveBundle"],
    queryFn: () => checkActiveBundle(axiosPrivate),
  });

  const { data: price, isLoading: priceLoading } = useQuery({
    queryKey: ["getPriceForCard"],
    queryFn: () => getPriceForCard(purchaseId, axiosPrivate),
    enabled: !!purchaseId,
  });

  const {
    data: card,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchasedCard", purchaseId],
    queryFn: () => getPurchasedCard(purchaseId, axiosPrivate),
    enabled: !!purchaseId,
  });

  useEffect(() => {
    setActiveTab("3");
  }, [setActiveTab]);

  const handleSuccess = useCallback(
    ({ data }) => {
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        navigate(`/share/${card?.id}?cardToken=${card?.cardToken}`, {
          replace: true,
        });
        toast({
          className: "shadow-xl rounded-lg text-primary",
          title: (
            <span className="flex items-center gap-2.5 text-primary">
              <span className="p-1 rounded-full shrink-0 bg-primary">
                <Check className="w-4 h-4 text-white" />
              </span>
              Success
            </span>
          ),
          description: "Card purchased successfully",
        });
      }
    },
    [navigate, card, toast]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await purchaseCard(data, purchaseId, axiosPrivate),
    onSuccess: handleSuccess,
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

  const handleCheckout = () => {
    mutate({
      currency,
      cardType: delivery,
    });
  };

  const cardPrice = useMemo(() => {
    if (isBundleActiveLoading || priceLoading)
      return <Loader2 className="w-4 h-4 animate-spin" />;
    if (isBundleActive) return "0.00";

    const isGroup = delivery === "group";

    if (currency === "USD") {
      return price.discount
        ? isGroup
          ? price?.group?.dollarDiscountPrice
          : price?.individual?.dollarDiscountPrice
        : isGroup
        ? price?.group?.dollarPrice
        : price?.individual?.dollarPrice;
    } else {
      return price.discount
        ? isGroup
          ? price?.group?.discountPrice
          : price?.individual?.discountPrice
        : isGroup
        ? price?.group?.price
        : price?.individual?.price;
    }
  }, [
    currency,
    delivery,
    isBundleActive,
    isBundleActiveLoading,
    price,
    priceLoading,
  ]);

  if (!user) return <Navigate to={LOGIN} state={{ from: location }} replace />;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !card) return <NotFound text="Card not found" />;
  return (
    <main className="max-w-7xl mx-auto font-inter flex justify-center items-center w-full lg:p-16">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-x-20 gap-y-8 sm:gap-y-16 mb-10 items-center">
        <Stepper card={card?.card} />
        <div className="w-full max-w-3xl flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full px-4">
            <h1 className="text-center text-2xl sm:text-5xl font-semibold font-bricolage">
              Pay and Checkout
            </h1>
            <p className="my-5 text-xl text-center text-[#333]">
              You are all set. You can now checkout your card.
            </p>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-6 px-5 py-8 md:px-20 md:py-10 rounded-xl bg-[#F7F5FF]">
            <div className="w-full flex items-center gap-x-8">
              <p className="font-medium">Card Delivery:</p>
              <div className="flex items-center gap-x-3">
                <Input
                  id="group"
                  name="delivery"
                  defaultChecked
                  onChange={() => setDelivery("group")}
                  value={""}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-pritext-primary"
                />
                <label
                  htmlFor="group"
                  className="block text-sm leading-6 text-[#333333] font-light"
                >
                  Group
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <Input
                  value={"individual"}
                  onChange={() => setDelivery("individual")}
                  id="individual"
                  name="delivery"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-pritext-primary"
                />
                <label
                  htmlFor="individual"
                  className="block text-sm leading-6 text-[#333333] font-light"
                >
                  Individual
                </label>
              </div>
            </div>
            <div className="w-full  max-w-2xl py-[18px] px-5 bg-[#3C3354CC] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-white flex gap-x-5 font-light">
              <span>
                <CircleAlert />
              </span>
              <p>
                {delivery === "group"
                  ? "Choosing 'Group' means that after payment, you will receive a unique link to share with friends, family, and colleagues. "
                  : "Choosing 'Individual' means that after payment, only you can sign the card. Select 'Group' if you want others to co-sign. "}
              </p>
            </div>
            <div className="w-full flex flex-col gap-y-5 bg-white py-[18px] px-5 rounded-md">
              <h3 className="font-semibold font-bricolage text-xl">
                Your Card
              </h3>
              <div className="flex items-center gap-x-5">
                <div className="w-36 rounded-xl relative">
                  {card && <PurchaseCadrdImg card={card} />}
                </div>
              </div>
              <div className="w-full px-5 py-[14px] bg-[#F7F5FF] flex justify-between rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-primary">
                <p className="font-light">Recipient</p>
                <p className="font-medium capitalize">{card?.receiverName}</p>
              </div>
            </div>
            {/* <form className="flex flex-col gap-y-2 w-full max-w-[600px] relative">
              <label htmlFor="voucher" className="sr-only">
                Voucher Code
              </label>
              <Input
                id="voucher"
                // {...register("voucher")}
                name="voucher"
                type="text"
                className="w-full border-primary bg-[#F7F5FF] rounded-xl text-base pr-40 py-8"
                placeholder="Input voucher code"
              />
              <Button
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-primary rounded-full py-[10px] px-8 text-white"
              >
                Apply
              </Button>
            </form> */}
            <div className="w-full flex flex-col gap-y-2">
              <Select
                value={currency}
                onValueChange={setCurrency}
                className="w-full"
                defaultValue="NGN"
              >
                <SelectTrigger className="w-20 p-0 self-end text-xl text-primary border-none bg-inherit">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-between w-full text-2xl">
                <p className="font-light text-primary">Card Price</p>
                <p className="font-semibold text-[#707070] flex items-center justify-between gap-1">
                  {currency === "USD" ? "$" : "₦"} {formatPrice(cardPrice)}
                </p>
              </div>
              {/* <div className="flex justify-between w-full text-2xl">
                <p className="font-light text-primary">Voucher</p>
                <p className="font-light text-[#707070]">-</p>
              </div> */}
              <div className="flex justify-between w-full text-2xl">
                <p className="font-light text-primary">Total</p>
                <p className="font-semibold text-[#707070] flex items-center justify-between gap-1">
                  {currency === "USD" ? "$" : "₦"} {formatPrice(cardPrice)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-4 mt-8">
            <Button
              type="button"
              disabled={isPending}
              onClick={handleCheckout}
              className="h-auto mx-auto block text-base/6 font-normal w-full max-w-[500px] bg-primary rounded-lg py-[18px] text-white"
            >
              {isPending ? (
                <Loader2 className="animate-spin block mx-auto w-10" />
              ) : (
                "Checkout"
              )}
            </Button>
          </div>
        </div>{" "}
      </div>
    </main>
  );
};

Checkout.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};
