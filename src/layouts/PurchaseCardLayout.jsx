import { getCardById } from "@/api/cards";
import Stepper from "@/components/card/Stepper";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Outlet, useParams } from "react-router-dom";

export const PurchaseCardLayout = () => {
  const { id } = useParams();

  const { data: card, isLoading } = useQuery({
    queryKey: ["card", id],
    queryFn: () => getCardById(id),
  });

  if (isLoading)
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );

  return (
    <div></div>
  );
};
