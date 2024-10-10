import { deleteCard, getCardForUser } from "@/api/cards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  BadgeCheck,
  Check,
  CircleAlert,
  Clock,
  CreditCard,
  Edit,
  EllipsisVertical,
  Loader2,
  Trash,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PurchaseCadrdImg } from "../PurchaseCadrdImg";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const Cards = () => {
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data: cardData, isLoading } = useQuery({
    queryKey: ["my-cards"],
    queryFn: () => getCardForUser(axiosPrivate),
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteCard"],
    mutationFn: async (data) => await deleteCard(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cards"] });
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: "Card deleted successfully",
      });
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

  const handleDelete = (id) => {
    mutate(id);
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="m-10 flex flex-col gap-4 max-w-[1233px] mx-auto px-5">
      <div className="w-full flex flex-col gap-4">
        {cardData?.results.length ? (
          cardData?.results.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg border shadow-lg flex flex-col md:flex-row w-full justify-between  mt-2 gap-4 md:px-7 md:py-9 px-4 py-6"
            >
              <div className="flex gap-7 md:gap-14 w-full">
                <div className="w-full relative min-w-10 md:min-w-[139px] max-w-[139px]">
                  <PurchaseCadrdImg card={card} />
                </div>
                <div className="capitalize flex flex-col items-start justify-between gap-3">
                  <Link
                    to={
                      card.paymentStatus !== "SUCCESS"
                        ? `/edit/${card.id}`
                        : `/share/${card.id}?cardToken=${card.cardToken}`
                    }
                    className="flex flex-col gap-3 md:gap-5"
                  >
                    <h1 className="flex gap-1 text-[#343C44] font-bricolage font-medium text-xl md:text-3xl">
                      Card for {card.receiverName}
                      {/* <span className="text-slate-900 mt-1">{card.cardNumber}</span> */}
                    </h1>
                    <p className="text-base text-[#6D6D6D]">
                      {/* <span className="font-light">Recipient </span> */}
                      <span className="font-medium normal-case md:text-base text-xs">
                        {card.receiverEmail}
                      </span>
                    </p>
                  </Link>
                  <div className="flex gap-5">
                    <button className="bg-[#0365341A] rounded-[29px] px-2 py-1 md:px-4 md:py-2 text-xs md:text-base text-[#036534] text-nowrap">
                      {card?.card?.category.name}
                    </button>
                    <button className="bg-[#7C4CFF1A] rounded-[29px] px-2 py-1 md:px-4 md:py-2 text-xs  md:text-base text-primary flex gap-1 items-center text-nowrap">
                      <Users className="w-4 h-4 hidden md:block" />{" "}
                      {`${card.cardCollaborators} ${
                        card.cardCollaborators === 1
                          ? "Collaborator"
                          : "Collaborators"
                      }`}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full justify-between">
                <div className="flex items-center justify-center self-center w-full h-full md:mx-auto">
                  <div className="flex flex-col gap-1 md:items-center w-full">
                    {card.sent ? (
                      <>
                        <p className="text-xs/5 text-[#036534] font-medium  flex items-center">
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Card Sent
                        </p>
                        <p className="text-xs font-medium text-[#036534]">
                          {dayjs(card.sendDate).format("LL")}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs/5 text-[#EC712E] font-medium  flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Pending Delivery
                        </p>
                        <p className="text-xs font-medium text-[#EC712E]">
                          {dayjs(card.sendDate).format("LLL")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full flex md:flex-col justify-between items-center gap-2">
                  <div className="flex items-center gap-4">
                    <p
                      className={`font-medium rounded-full px-2 py-1 md:px-4 md:py-2 text-xs capitalize ${
                        card.paymentStatus === "PENDING"
                          ? "text-[#EC712E] bg-[#EC712E1A]"
                          : "bg-[#0365341A] text-[#036534]"
                      }`}
                    >
                      {card.paymentStatus === "PENDING" ? "Unpaid" : "Paid"}
                    </p>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:bg-[#0365341A] rounded-full p-2 shrink-0">
                        <EllipsisVertical className="w-6 h-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent asChild>
                        <div>
                          <DropdownMenuItem asChild>
                            <Link to={`/edit/${card.id}`}>
                              <Edit className="text-primary mr-2 h-3 w-3 lg:h-5 lg:w-5" />{" "}
                              Edit card
                            </Link>
                          </DropdownMenuItem>
                          {card.paymentStatus === "PENDING" && (
                            <DropdownMenuItem asChild>
                              <Link to={`/explore/card/${card.id}/checkout`}>
                                <CreditCard className="text-primary mr-2 h-3 w-3 lg:h-5 lg:w-5" />{" "}
                                Complete payment
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="inline-flex text-red-600 items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 w-full cursor-pointer hover:bg-red-600 hover:text-white"
                              >
                                <Trash className="mr-2 h-3 w-3 lg:h-5 lg:w-5" />
                                <span>Delete card</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the card.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                  <Button
                                    disabled={isDeleting}
                                    type="button"
                                    variant="destructive"
                                    onClick={() => handleDelete(card.id)}
                                  >
                                    delete
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Cancel
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-gray-500 md:mt-4">
                    {dayjs(card.createdAt).locale("en").fromNow(false)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[calc(100vh-500px)] w-full flex flex-col items-center justify-center gap-3">
            <p>You don&apos;t have any cards</p>
            <Link to="/explore">
              <Button className="text-white px-10 py-5 rounded-full text-xl/6 h-auto font-normal shadow-lg">
                Pick a Card
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
