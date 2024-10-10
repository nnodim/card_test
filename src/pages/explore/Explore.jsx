import { CardCategories } from "@/components/CardCategories";
import { CardReel } from "@/components/CardReel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryId, setCategoryId] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "popularity:desc"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const updateParams = (newParams) => {
      setSearchParams((prev) => {
        Object.entries(newParams).forEach(([key, value]) => {
          if (value) {
            prev.set(key, value);
          } else {
            prev.delete(key);
          }
        });
        return prev;
      }, { replace: true });
    };
    updateParams({ category: categoryId, sort: sortBy, page: page.toString() });
  }, [categoryId, sortBy, page, setSearchParams]);

  return (
    <main className="max-w-7xl mx-auto font-inter flex flex-col justify-center items-center w-full px-5 py-10 md:p-16">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-center text-2xl sm:text-5xl font-semibold font-bricolage">
          Explore our E-cards selection for different occasions
        </h1>
        <p className="my-8 sm:my-16 text-base sm:text-xl text-center">
          Choose from wide range of categories to find the ideal way to express
          your love.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <ScrollArea className="w-full border-r pr-2">
            <ToggleGroup
              value={categoryId}
              onValueChange={(value) => {
                setCategoryId(value);
                setPage(1); // Reset to first page on category change
              }}
              type="single"
              className="w-full"
            >
              <CardCategories />
            </ToggleGroup>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Select
            className="w-full"
            defaultValue={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              setPage(1); // Reset to first page on sort change
            }}
          >
            <SelectTrigger className="text-primary sm:max-w-[200px] w-full">
              <p className="text-[#828282] text-xs mr-4">Sort by</p>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="popularity:desc">Popular</SelectItem>
                <SelectItem value="createdAt:desc">Newest</SelectItem>
                <SelectItem value="createdAt">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CardReel
        paginate={true}
        to="/explore/card"
        page={page}
        setPage={setPage}
        query={{ categoryId, sortBy, page, limit: 20 }}
      />
    </main>
  );
};
