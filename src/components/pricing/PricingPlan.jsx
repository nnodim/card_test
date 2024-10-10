import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    title: "Single card purchase",
    price: "₦1,499",
    dollarPrice: "$1.99",
    features: [
      "Variety of Cards Designs",
      "Unlimited pages",
      "Custom Text or Picture",
      "Theme Customization",
      "Delivery Date and Time",
      "Delivery Notification",
      "Thank-you Message & PDF Download",
      "Single Signage",
    ],
  },
  {
    title: "Group card purchase",
    price: "₦1,999",
    dollarPrice: "$3.99",
    features: [
      "Variety of Cards Designs",
      "Unlimited pages",
      "Custom Text or Picture",
      "Theme Customization",
      "Delivery Date and Time",
      "Delivery Notification",
      "Thank-you Message & PDF Download",
      "Effortless invitation with share link",
      "Real-time tracking",
      "Multiple Signage",
    ],
  },
];

const PricingCard = ({ title, price, dollarPrice, features }) => (
  <div className="relative lg:pr-36 lg:pl-[80px] lg:py-[64px] p-4 flex flex-col justify-between gap-2 bg-white shadow-lg border border-[#7C4CFF66] rounded-[16px]">
    <span className="absolute w-[60px] h-[60px] -top-4 -right-3 bg-[#15B85F] text-white flex justify-center items-center rounded-full">
      <Star />
    </span>
    <div className="flex flex-col items-center gap-6">
      <h5 className="text-[24px] font-bricolage leading-[28.8px] font-bold">
        {title}
      </h5>
      <div className="flex items-end gap-2">
        <h2 className="text-[60px] font-bricolage leading-[72px] font-bold">
          {price}
        </h2>
        <p className="font-light text-[30px] font-bricolage leading-[36px] mb-3">
          ({dollarPrice})
        </p>
      </div>

      <hr className="border-t border-gray-300 w-full" />

      <div className="px-5">
        <h4 className="text-xl leading-6 font-semibold text-gray-800 mb-6">
          Features:
        </h4>
        <ul className="space-y-6 font-inter">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 font-inter text-[#222222] leading-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M22.5 11.0799V11.9999C22.4988 14.1563 21.8005 16.2545 20.5093 17.9817C19.2182 19.7088 17.4033 20.9723 15.3354 21.5838C13.2674 22.1952 11.0573 22.1218 9.03447 21.3744C7.01168 20.6271 5.28465 19.246 4.11096 17.4369C2.93727 15.6279 2.37979 13.4879 2.52168 11.3362C2.66356 9.18443 3.49721 7.13619 4.89828 5.49694C6.29935 3.85768 8.19279 2.71525 10.2962 2.24001C12.3996 1.76477 14.6003 1.9822 16.57 2.85986"
                  stroke="#7C4CFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5 4L12.5 14.01L9.5 11.01"
                  stroke="#7C4CFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Link to="/explore" className="w-full">
      <Button className="bg-primary mt-10 text-white py-5 text-[20px] leading-[24px] h-auto w-full">
        Get started
      </Button>
    </Link>
  </div>
);

const PricingPlan = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-center gap-5 px-5">
      {pricingPlans.map((plan, index) => (
        <PricingCard
          key={index}
          title={plan.title}
          price={plan.price}
          dollarPrice={plan.dollarPrice}
          features={plan.features}
        />
      ))}
    </section>
  );
};

export default PricingPlan;

PricingCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  dollarPrice: PropTypes.string,
  features: PropTypes.array,
};
