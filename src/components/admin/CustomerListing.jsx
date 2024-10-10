import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import CustomerPop from "@/pages/admin/CustomerPop";
import { MoreHorizontal, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const CustomerPlaceholder = () => {
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
        <button>
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export const CustomerListing = ({ customer, index }) => {
  const [isVisble, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!customer || !isVisble) return <CustomerPlaceholder />;

  if (isVisble && customer) {
    return (
      <TableRow
        className={`rounded-md mt-2 ${
          index % 2 === 0 ? "bg-[#EDEBF39E]" : "bg-white"
        }`}
      >
        <TableCell className="py-5 text-base">
          <UserCircle2 className="h-6 w-6 md:h-8 md:w-8 rounded-full text-primary" />
        </TableCell>
        <TableCell className="py-5 text-[#6D6D6D] text-base">
          {customer.fullName}
        </TableCell>
        <TableCell className="py-5 text-[#6D6D6D] font-light">
          {customer.email}
        </TableCell>
        <TableCell className="py-5 text-[#6D6D6D] text-base">
          #{customer.id}
        </TableCell>
        <TableCell className="py-5 text-xs">
          {customer.isEmailVerified ? (
            <span className="bg-primary bg-opacity-[5%] text-primary px-3 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <span className="bg-[#EC712E] bg-opacity-[5%] text-[#EC712E] px-3 py-1 rounded-full">
              Pending
            </span>
          )}
        </TableCell>
        <TableCell className="py-5 text-base">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-medium text-center">
                Actions
              </DropdownMenuLabel>
              <CustomerPop customer={customer} />
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  }
};

CustomerListing.propTypes = {
  customer: PropTypes.object,
  index: PropTypes.number,
};
