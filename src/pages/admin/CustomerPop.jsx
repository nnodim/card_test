import { getCustomerStat } from "@/api/admin";
import { bundleCards } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, Eye, Mail, User2, Users } from "lucide-react";
import propTypes from "prop-types";

const CustomerPop = ({ customer }) => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading } = useQuery({
    queryKey: ["stat", customer.id],
    queryFn: () => getCustomerStat(axiosPrivate, customer.id),
    enabled: !!customer.id,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 w-full cursor-pointer"
          >
            <Eye className="h-4 w-4 mr-2" />
            <span>View</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sr-only">
            <DialogTitle>Customer</DialogTitle>
            <DialogDescription>
              Information about the customer
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center max-w-[400px] w-full mx-auto">
            <User2 className="w-24 h-24 rounded-full mb-4 text-primary" />
            <h2 className="text-4xl font-semibold mb-2">{customer.fullName}</h2>
            <p className="text-primary font-light mb-4">{customer.email}</p>
            {/* <div className="flex justify-between w-full my-[40px]">
              <p className="text-[#00A859] text-center pt-3 bg-[#00A859] bg-opacity-[5%] px-3  rounded-full">
                {customer.status}
              </p>
              <div>
                <p>{customer.date}</p>
                <p className="text-[#6D6D6D]">Last seen</p>
              </div>
            </div> */}
            <hr className="border-primary border w-[90%] my-[40px]" />

            <div className="bg-primary bg-opacity-[5%] rounded-lg p-5 px-[60px] flex justify-between items-center space-x-6 gap-x-10  mb-14">
              <div className="text-center flex flex-col items-center">
                <Mail className="h-6 w-6 text-primary" />
                <p className="text-xl font-light text-[#6D6D6D] mt-3">
                  {isLoading ? "-" : data?.stats?.cardsSent}
                </p>
                <p className="text-[#6D6D6D] text-xs font-light">Sent</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <img src={bundleCards} alt="" className="h-6 w-6" />
                <p className="text-xl font-light text-[#6D6D6D] mt-3">
                  {isLoading ? "-" : data?.stats?.activeSubscriptions}
                </p>
                <p className="text-[#6D6D6D] text-xs font-light">Bundles</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <Users className="h-6 w-6 text-primary" />
                <p className="text-xl font-light text-[#6D6D6D] mt-3">
                  {isLoading ? "-" : data?.stats?.collaborators}
                </p>
                <p className="text-[#6D6D6D] text-xs font-light">
                  Collaborators
                </p>
              </div>
              <div className="text-center flex flex-col items-center">
                <ArrowUpDown className="h-6 w-6 text-primary" />
                <p className="text-xl font-light text-[#6D6D6D] mt-3">
                  {isLoading ? "-" : data?.stats?.transactions}
                </p>
                <p className="text-[#6D6D6D] text-xs font-light">
                  Transactions
                </p>
              </div>
            </div>
            <DialogClose asChild>
              <Button className="w-full h-auto border px-3 py-5 max-w-[170px] text-base text-primary border-primary bg-[#7c4cff4d] hover:text-white">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerPop;

CustomerPop.propTypes = {
  customer: propTypes.object,
};
