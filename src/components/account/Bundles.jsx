import { getBundlesforUser } from "@/api/bundle";
import useAuthStore from "@/hooks/useAuthStore";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import {
    Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BundleList } from "./BundleList";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const Bundles = () => {
  const { user } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();

  const { data: bundles, isLoading: isLoadingBundles } = useQuery({
    queryKey: ["my-bundles", user?.id],
    queryFn: () => getBundlesforUser(axiosPrivate, user?.id),
    enabled: !!user?.id,
  });

  if (isLoadingBundles) {
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="m-10 flex flex-col gap-4 max-w-[1233px] mx-auto px-5">
      <ul className="w-full flex flex-col gap-4">
        {bundles?.results.length ? (
          bundles?.results.map((bundle) => (
            <BundleList key={bundle.id} bundle={bundle} />
          ))
        ) : (
          <div className="h-[calc(100vh-500px)] w-full flex flex-col items-center justify-center gap-3">
            <p>You don&apos;t have any bundles</p>
            <Link to='/pricing'>
              <Button className="text-white px-10 py-5 rounded-full text-xl/6 h-auto font-normal shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Bundles;
