import { TransactionTable } from "@/components/admin/TransactionTable";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { CustomerTable } from "../../components/admin/CustomerTable";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("customers");

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    setPage(1);
  };

  const handleTabChange = (value) => {
    setCurrentTab(value);
    setPage(1);
  };

  return (
    <main className="h-screen w-full flex">
      <div className="w-[20%] hidden lg:block ml-5 my-4">
        <Sidebar />
      </div>

      <section className="w-full lg:w-[80%] flex flex-col px-5 lg:px-10 gap-7">
        <Searchbar />
        <section className="bg-[#7C4CFF] bg-opacity-[6%] px-3 lg:px-10 py-8 h-full w-full rounded-md overflow-y-auto mb-4">
          <div className="">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Dashboard
            </h1>
            <div className="ml-[280px] hidden md:block text-[rgba(124,76,255,0.6)]">
              Date Range
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative w-full max-w-[247px] h-auto md:h-14">
                <input
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  placeholder="Search anything here..."
                  className="w-full p-4 pr-10 rounded-lg border border-[#7C4CFF89] bg-[#7C4CFF0F] focus:outline-none focus:ring-2 focus:ring-purple-600 "
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-purple-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    />
                  </svg>
                </div>
              </div>
              <div className="hidden md:block border-l-2 self-center border-gray-300 h-10"></div>
              {/* Date Range Selectors */}

              <div>
                <div className="text-[rgba(124,76,255,0.6)] md:hidden mb-3">
                  Date Range
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full max-w-[247px] h-auto md:h-14 bg-[#7C4CFF0F] justify-start text-left font-normal",
                          !dateRange[0] && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange[0] ? (
                          format(dateRange[0], "PPP")
                        ) : (
                          <span>Select start date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange[0]}
                        onSelect={(date) =>
                          handleDateChange([date, dateRange[1]])
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full max-w-[247px] h-auto md:h-14 bg-[#7C4CFF0F] justify-start text-left font-normal",
                          !dateRange[1] && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange[1] ? (
                          format(dateRange[1], "PPP")
                        ) : (
                          <span>Select end date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange[1]}
                        onSelect={(date) =>
                          handleDateChange([dateRange[0], date])
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* <div className="border-l-2 border-gray-300 h-10"></div>

              <button className="w-[160px] h-auto md:h-14 p-4 rounded-lg bg-[#7C4CFF26] text-purple-600 border border-[#7C4CFF] hover:bg-purple-600 hover:text-white transition">
                Filter
              </button> */}
            </div>
          </div>

          {/* Tabs for Customers and Transactions */}
          <Tabs
            defaultValue="customers"
            onValueChange={handleTabChange}
            className="mt-12"
          >
            <TabsList className="w-full max-w-[300px] gap-3 bg-inherit">
              <TabsTrigger
                className="w-full bg-[#7C4CFF1C] text-primary data-[state=active]:bg-primary data-[state=active]:text-white rounded-full py-3 px-7"
                value="customers"
              >
                Customers
              </TabsTrigger>
              <TabsTrigger
                className="w-full bg-[#7C4CFF1C] text-primary data-[state=active]:bg-primary data-[state=active]:text-white rounded-full py-3 px-7"
                value="transactions"
              >
                Transactions
              </TabsTrigger>
            </TabsList>

            {/* Customers Table */}
            <CustomerTable
              dateRange={dateRange}
              search={search}
              page={page}
              setPage={setPage}
              currentTab={currentTab}
            />

            {/* Transactions Table */}
            <TransactionTable
              dateRange={dateRange}
              search={search}
              page={page}
              setPage={setPage}
              currentTab={currentTab}
            />
          </Tabs>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
