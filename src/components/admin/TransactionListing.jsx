import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const TransactionPlaceholder = () => {
  return (
    <TableRow className={`bg-white text-[#6D6D6D] capitalize cursor-pointer`}>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4 bg-slate-300 rounded-md"></Skeleton>
      </TableCell>
      <TableCell>
        <button>
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export const TransactionListing = ({ invoice, index, serialNumber }) => {
  const [isVisble, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!invoice || !isVisble) return <TransactionPlaceholder />;

  if (isVisble && invoice) {
    return (
      <TableRow key={index} className="bg-[#F6F4FF]">
        <TableCell className="font-medium">{serialNumber}</TableCell>
        <TableCell>
          <div>
            <div className=" font-[16px] text-[#6D6D6D] ">
              {invoice.user?.fullName}
            </div>
            <div className="text-sm text-[#6D6D6D]">#{invoice.user?._id}</div>
          </div>
        </TableCell>
        <TableCell className="text-[#6D6D6D]">{invoice.user?.email}</TableCell>
        <TableCell className="text-[#6D6D6D]">
          {invoice.transactionId}
        </TableCell>
        <TableCell className="text-[#6D6D6D]">{invoice.type || "-"}</TableCell>
        <TableCell
          className={
            invoice.remainingCards ? "text-[#7C4CFF]" : "text-[#6D6D6D]"
          }
        >
          {invoice.remainingCards < 0 || invoice.remainingCards === null
            ? "-"
            : invoice.remainingCards}
        </TableCell>
        <TableCell className="text-[#7C4CFF]">{invoice.amount}</TableCell>
        <TableCell>
          <span
            className={cn("px-3 py-1 text-xs rounded-full", {
              "bg-white text-primary": invoice.status === "SUCCESS",
              "bg-[#EC712E] bg-opacity-[5%] text-[#EC712E]":
                invoice.status === "PENDING",
              "bg-[#F6F4FF] text-[#6D6D6D]": invoice.status === "Failed",
            })}
          >
            {invoice.status}
          </span>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  }
};

TransactionListing.propTypes = {
  invoice: PropTypes.object,
  index: PropTypes.number,
  serialNumber: PropTypes.number,
};
