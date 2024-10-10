import { getCustomers } from "@/api/admin";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useQuery } from "@tanstack/react-query";
import { CustomerListing } from "./CustomerListing";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { EmptyState } from "./EmptyState";
import { Users2 } from "lucide-react";

export const CustomerTable = ({
  search,
  dateRange,
  page,
  setPage,
  currentTab,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers", page, search, dateRange],
    queryFn: () =>
      getCustomers(axiosPrivate, {
        page,
        search,
        startDate: dateRange[0]?.toISOString(),
        endDate: dateRange[1]?.toISOString(),
      }),
    keepPreviousData: true,
    enabled: currentTab === "customers",
  });

  useEffect(() => {
    if (customers) {
      setTotalPages(customers.totalPages);
    }
  }, [customers]);

  let map = [];
  if (customers && customers.results.length) {
    map = customers.results;
  } else if (isLoading) {
    map = new Array(10).fill(null);
  }

  return (
    <>
      <TabsContent value="customers">
        {map.length > 0 ? (
          <>
            <Table className="mt-5">
              <TableHeader className="bg-[#7C4CFF1C]">
                <TableRow>
                  <TableHead className="text-[#7C4CFF] py-5"></TableHead>
                  <TableHead className="text-[#7C4CFF] py-5">
                    Customer Name
                  </TableHead>
                  <TableHead className="text-[#7C4CFF] py-5">Email</TableHead>
                  <TableHead className="text-[#7C4CFF] py-5">
                    Customer ID
                  </TableHead>
                  <TableHead className="text-[#7C4CFF] py-5">Status</TableHead>
                  <TableHead className="text-[#7C4CFF] py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="before:content-['\200C'] before:block before:leading-[1em]">
                {map?.map((customer, index) => (
                  <CustomerListing
                    key={index}
                    customer={customer}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center w-full mt-8">
              <Button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span>
                {page} of {totalPages || 1}
              </span>
              <Button
                onClick={() =>
                  setPage((old) =>
                    !customers || customers.totalPages === old ? old : old + 1
                  )
                }
                disabled={page === customers?.totalPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            icon={<Users2 className="w-10 h-10 text-primary" />}
            heading={"customers"}
          />
        )}
      </TabsContent>
    </>
  );
};

CustomerTable.propTypes = {
  search: PropTypes.string,
  dateRange: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
  currentTab: PropTypes.string,
};
