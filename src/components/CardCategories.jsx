import { getAllCardCategories } from "@/api/cards";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQuery } from "@tanstack/react-query";

export const CardCategories = () => {
  const {
    data: cardCategories,
    // isLoading,
  } = useQuery({
    queryKey: ["card-categories"],
    queryFn: getAllCardCategories,
  });  

  if (!cardCategories) return null;

  const allCategory = cardCategories?.find((item) => item.name === "All");
  const othersCategory = cardCategories?.find((item) => item.name === "Others");
  const otherCategories = cardCategories
    ?.filter((item) => item.name !== "All" && item.name !== "Others")
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedCardCategories = [
    allCategory,
    ...otherCategories,
    othersCategory,
  ]?.filter(Boolean);

  return sortedCardCategories?.map((item, index) => (
    <ToggleGroupItem
      key={index}
      value={item.name === "All" ? "all" : item.id}
      className="text-base md:text-xl text-[#333333] hover:bg-[#7C4CFF1A] data-[state=on]:bg-[#7C4CFF1A] hover:text-primary data-[state=on]:text-primary transition-all text-nowrap"
    >
      {item.name}
    </ToggleGroupItem>
  ));
};
