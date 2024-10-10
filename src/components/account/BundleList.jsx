import { bundlCardbg, bundleStock } from "@/assets";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export const BundleList = ({ bundle }) => {
  return (
    <li
      className="relative bg-cover bg-center text-white rounded-[20px] p-5 md:py-9 md:px-7 "
      style={{ backgroundImage: `url(${bundlCardbg})` }}
    >
      {/* Purple overlay */}
      <div className="absolute bundle-card inset-0 rounded-lg mix-blend-overlay"></div>

      {/* Content  */}
      <div className="flex flex-col md:flex-row relative w-full rounded-lg">
        <div className="w-full flex items-start px-2 py-1 gap-5">
          <div className="flex flex-col gap-2">
            <img
              src={bundleStock}
              className="w-16 md:max-w-36 rounded-xl"
              alt=""
            />
            <p className="text-[7px]/[10px] text-center  h-auto w-full md:hidden font-extralight">
              Purchased {dayjs(bundle.createdAt).locale("en").fromNow()}
            </p>
          </div>
          <div className="flex flex-col justify-between h-full w-full gap-2">
            <div className="flex gap-1 text-white">
              <h1 className="text-xl md:text-3xl font-bricolage">
                {bundle?.bundle?.name}
              </h1>
              {/* <p>#0000001</p> */}
            </div>
            {bundle.usedCards === 0 && (
              <div className="flex-col hidden md:flex lg:flex-row gap-2">
                <p className="text-[10px] sm:text-sm md:text-base tracking-[0.25px]">
                  You have not sent any cards from your bundle yet.
                </p>
                <Link
                  to={"/explore"}
                  className="self-end px-4 py-1 text-base font-medium text-primary bg-white rounded-[6px] shadow-[0px_0px_35px_0px_rgba(255,255,255,0.52)]"
                >
                  Send Now?
                </Link>
              </div>
            )}
            <div className="flex gap-4">
              <p className="px-4 py-1 md:py-2 text-center text-xs md:text-base text-primary bg-white rounded-full shadow">
                {bundle.isActive ? "Paid" : "Unpaid"}
              </p>
              <p className=" md:hidden px-4 py-1 md:py-2 text-xs md:text-base text-primary bg-white rounded-full">
                {`${bundle.remainingCards}/${bundle.totalCards} cards`}
              </p>
            </div>
            {bundle.usedCards === 0 && (
              <div className="flex md:hidden flex-col lg:flex-row gap-2 items-start">
                <p className="text-[10px] sm:text-sm md:text-base">
                  You have not sent any cards from your bundle yet.
                </p>
                <Link
                  to={"/explore"}
                  className="px-4 py-1 text-sm font-medium text-primary bg-white rounded-[6px] shadow-[0px_0px_35px_0px_rgba(255,255,255,0.52)]"
                >
                  Send Now?
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-between items-center text-nowrap">
          <p className="px-4 py-1 md:py-2 mt-5 text-base text-primary bg-white rounded-full">
            {`${bundle.remainingCards}/${bundle.totalCards} cards`}
          </p>
          <p className="text-xs w-full">
            Purchased {dayjs(bundle.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </li>
  );
};

BundleList.propTypes = {
  bundle: PropTypes.object,
};
