import { getSingleBundle, purchaseBundle } from "@/api/bundle";
import { giftVoucher } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { formatPrice } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
// import { useState } from "react";
import { useParams } from "react-router-dom";

export const BundleCheckout = () => {
  const { toast } = useToast();
  const [currency, setCurrency] = useState("NGN");
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { data: bundle } = useQuery({
    queryKey: ["bundle", id],
    queryFn: () => getSingleBundle(id),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["purchaseBundle"],
    mutationFn: async (data) => await purchaseBundle(data, bundle.id, axiosPrivate),
    onSuccess: ({ data }) => {
      window.location.href = data.authorization_url;
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

  const cardPrice = useMemo(() => {
    if (currency === "USD") {
      return bundle?.dollarPrice;
    } else {
      return bundle?.price;
    }
  }, [currency, bundle]);

  const handleCheckout = () => {
    mutate({ currency });
  };

  return (
    <main className="max-w-7xl mx-auto font-inter flex flex-col justify-center items-center w-full py-10">
      <div className="w-full max-w-3xl flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-center text-2xl sm:text-5xl font-semibold font-bricolage">
            Pay and Checkout
          </h1>
          <p className="my-5 text-xl text-center text-[#333]">
            You are all set. You can now checkout your card.
          </p>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-6 px-5 py-8 md:px-20 md:py-10 rounded-xl bg-[#F7F5FF]">
          <div className="w-full flex flex-col gap-y-5 bg-white py-[18px] px-5 rounded-md">
            <h3 className="font-semibold font-bricolage text-xl">
              {bundle?.name}
            </h3>
            <div className="flex items-center gap-x-5">
              <div className="w-36 rounded-xl overflow-hidden">
                <img
                  src={giftVoucher}
                  alt={bundle?.name}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
              </div>
              <p className="font-medium">{`${bundle?.numberOfCards} Group Cards - All Categories`}</p>
            </div>
            {/* <div className="w-full px-5 py-[14px] bg-[#F7F5FF] flex justify-between rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-primary">
            <p className="font-light">Recipient</p>
            <p className="font-medium">John Doe</p>
          </div> */}
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
        <Button
          type="button"
          disabled={isPending}
          onClick={handleCheckout}
          className="mt-8 h-auto text-base/6 font-normal w-full max-w-[500px] bg-primary rounded-lg py-[18px] text-white"
        >
          {isPending ? (
            <Loader2 className="animate-spin block mx-auto w-10" />
          ) : (
            "Pay for Bundle"
          )}
        </Button>
      </div>
    </main>
  );
};
