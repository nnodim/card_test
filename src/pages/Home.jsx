import { CardCategories } from "@/components/CardCategories";
import { CardReel } from "@/components/CardReel";
import { DemoCarousel } from "@/components/DemoCarousel";
import { GetStartedCTA } from "@/components/GetStartedCTA";
import HomeEnvelope from "@/components/home/HomeEnvelope";
import HomeFeatures from "@/components/home/HomeFeatures";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { DEMO } from "@/lib/routes";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryId, setCategoryId] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "popularity:desc"
  );

  useEffect(() => {
    const updateParams = (newParams) => {
      setSearchParams(
        (prev) => {
          Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
              prev.set(key, value);
            } else {
              prev.delete(key);
            }
          });
          return prev;
        },
        { replace: true }
      );
    };
    updateParams({ category: categoryId, sort: sortBy });
  }, [categoryId, sortBy, setSearchParams]);

  return (
    <main className="max-w-7xl mx-auto font-inter flex flex-col justify-center items-center w-full p-6 md:p-12">
      <HomeEnvelope />
      <div className="flex flex-col justify-center items-center gap-6 w-full pt-12 sm:pt-16 lg:pt-[100px]">
        <div className="flex flex-col gap-4 items-center font-bricolage">
          <p className="rounded-lg px-4 py-2 font-medium bg-[#7C4CFF1A] text-primary">
            Occasion
          </p>

          <h1 className="text-[#151419] text-center flex flex-col items-center leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Explore our E-cards selection
            <br /> for different occasions.
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-6 text-center">
            Create personalized messages with style: Everyone deserves beautiful
            memories.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <ScrollArea className="w-full">
            <ToggleGroup
              value={categoryId}
              onValueChange={(value) => {
                setCategoryId(value);
              }}
              type="single"
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
            }}
          >
            <SelectTrigger className="text-primary sm:max-w-[200px] w-full">
              <p className="text-[#828282] text-xs mr-4">Sort by</p>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="w-full z-[999]">
              <SelectGroup>
                <SelectItem value="popularity:desc">Popular</SelectItem>
                <SelectItem value="createdAt:desc">Newest</SelectItem>
                <SelectItem value="createdAt">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <form className="flex flex-col gap-y-2 w-full max-w-[330px] relative">
            <label htmlFor="search" className="sr-only">
              search card type
            </label>
            <Input
              id="search"
              name="search"
              type="text"
              className="w-full border-[#D0D5DD] rounded-xl text-base pr-40 py-8"
              placeholder="Search card type"
            />
            <Button
              type="submit"
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-primary rounded-full py-[10px] px-8 text-white"
            >
              Search
            </Button>
          </form> */}
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <CardReel
            to="/explore/card"
            query={{ categoryId, sortBy, limit: 10 }}
          />
          <Link
            to={`/explore?category=${categoryId}&sort=${sortBy}`}
            className="self-end mt-5"
          >
            <Button className="text-base h-auto rounded-xl font-normal px-6 sm:px-8 py-3 sm:py-[18px]">
              Explore all cards
            </Button>
          </Link>
        </div>
      </div>
      <HomeFeatures />
      <div className="flex flex-col justify-center items-center py-12 lg:py-[100px] gap-6 w-full">
        <p className="self-start border w-fit rounded-lg px-4 py-[10px] font-medium bg-[#7C4CFF1A] text-primary">
          How it works
        </p>
        <div className="flex flex-col lg:flex-row gap-y-6 justify-between items-start lg:items-center w-full">
          <h2 className="text-[#151419] w-full max-w-[554px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl/[60px] font-bricolage font-bold">
            Create Stunning E-Cards in 4 Easy Steps
          </h2>
          <p className="text-[#4F4F4F] leading-6 text-center lg:text-left mt-4 lg:mt-0">
            Personalize with Style: Everyone deserves beautiful memories
          </p>
        </div>
        <DemoCarousel />
        <Link to={DEMO} className="self-end mt-5">
          <Button className="text-base h-auto rounded-xl sm:text-lg md:text-xl font-normal px-6 sm:px-8 py-3 sm:py-[18px]">
            View Demo
          </Button>
        </Link>
      </div>
      <GetStartedCTA />
    </main>
  );
};
