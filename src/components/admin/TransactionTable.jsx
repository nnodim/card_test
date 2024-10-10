import { getInvoices } from "@/api/admin";
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
import { TransactionListing } from "./TransactionListing";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EmptyState } from "./EmptyState";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

const itemsPerPage = 10;

export const TransactionTable = ({
  search,
  dateRange,
  page,
  setPage,
  currentTab,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const axiosPrivate = useAxiosPrivate();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices", page, search, dateRange],
    queryFn: () =>
      getInvoices(axiosPrivate, {
        page,
        search,
        startDate: dateRange[0]?.toISOString(),
        endDate: dateRange[1]?.toISOString(),
      }),
    keepPreviousData: true,
    enabled: currentTab === "transactions",
  });

  useEffect(() => {
    if (invoices) {
      setTotalPages(invoices.totalPages);
    }
  }, [invoices]);

  let map = [];
  if (invoices && invoices.results.length) {
    map = invoices.results;
  } else if (isLoading) {
    map = new Array(10).fill(null);
  }

  return (
    <TabsContent value="transactions">
      {map.length > 0 ? (
        <>
          <Table className="mt-5 overflow-auto">
            <TableHeader>
              <TableRow className="text-primary text-xs">
                <TableHead className="text-primary text-xs">S/N</TableHead>
                <TableHead className="text-primary text-xs">
                  CUSTOMER NAME
                </TableHead>
                <TableHead className="text-primary text-xs">EMAIL</TableHead>
                <TableHead className="text-primary text-xs">
                  TRANSACTION ID
                </TableHead>
                <TableHead className="text-primary text-xs">PURCHASE</TableHead>
                <TableHead className="text-primary text-xs">
                  BUNDLE BALANCE
                </TableHead>
                <TableHead className="text-primary text-xs">AMOUNT</TableHead>
                <TableHead className="text-primary text-xs">STATUS</TableHead>
                <TableHead className="text-primary text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {map.map((invoice, index) => (
                <TransactionListing
                  key={index}
                  invoice={invoice}
                  index={index}
                  serialNumber={(page - 1) * itemsPerPage + index + 1}
                />
              ))}
            </TableBody>
          </Table>
          {/* <PaginationLink /> */}
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
                  !invoices || invoices.totalPages === old ? old : old + 1
                )
              }
              disabled={page === invoices?.totalPages}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <EmptyState
          icon={<ArrowUpDown className="w-10 h-10 text-primary" />}
          heading="transactions"
        />
      )}
    </TabsContent>
  );
};

TransactionTable.propTypes = {
  search: PropTypes.string,
  dateRange: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
  currentTab: PropTypes.string,
};
