import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Card = ({ icon: Icon, heading, text, className }) => (
  <div
    className={cn(
      "flex flex-col gap-6 justify-center md:justify-start items-center border border-[#F2F2F2] bg-white p-6 rounded-xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]",
      className
    )}
  >
    <div className="p-4  bg-purple-100 rounded-full">
      <Icon className="text-4xl text-purple-500" />
    </div>
    <h3 className="text-center text-base sm:text-lg leading-8 md:text-xl/9 font-bold">
      {heading}
    </h3>
    <p className="text-[#828282] text-xs sm:text-sm md:text-base leading-6 text-center">
      {text}
    </p>
  </div>
);
const CreativityIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 10V14H10V10H14ZM16 10H21V14H16V10ZM14 21H10V16H14V21ZM16 21V16H21V20C21 20.5523 20.5523 21 20 21H16ZM14 3V8H10V3H14ZM16 3H20C20.5523 3 21 3.44772 21 4V8H16V3ZM8 10V14H3V10H8ZM8 21H4C3.44772 21 3 20.5523 3 20V16H8V21ZM8 3V8H3V4C3 3.44772 3.44772 3 4 3H8Z"
      fill="#7C4CFF"
    />
  </svg>
);

const FastEasyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5C8 9.11929 6.88071 8 5.5 8C4.11929 8 3 9.11929 3 10.5C3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8C19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056C18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z"
      fill="#7C4CFF"
    />
  </svg>
);

const HeartfeltIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM15.5355 7.05025L10.5858 12L12 13.4142L16.9497 8.46447L15.5355 7.05025Z"
      fill="#7C4CFF"
    />
  </svg>
);
const DeliveryIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.0039 6H15.0039C11.6902 6 9.00391 8.68629 9.00391 12C9.00391 15.3137 11.6902 18 15.0039 18H22.0039V20C22.0039 20.5523 21.5562 21 21.0039 21H3.00391C2.45163 21 2.00391 20.5523 2.00391 20V4C2.00391 3.44771 2.45163 3 3.00391 3H21.0039C21.5562 3 22.0039 3.44771 22.0039 4V6ZM15.0039 8H23.0039V16H15.0039C12.7947 16 11.0039 14.2091 11.0039 12C11.0039 9.79086 12.7947 8 15.0039 8ZM15.0039 11V13H18.0039V11H15.0039Z"
      fill="#7C4CFF"
    />
  </svg>
);
const ImpactIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.8717 8.17467C19.1139 6.61818 17.9081 5.32001 16.422 4.44796C15.579 5.62853 13.8362 7.44712 13.3225 7.44712C12.6993 7.44712 12.5735 4.37599 12.5483 3.2669C12.367 3.25569 12.1842 3.25 12 3.25C11.1888 3.25 10.4033 3.36039 9.6579 3.56698C10.38 3.51264 10.8626 3.53472 10.8626 3.53472C10.8626 3.53472 11.5358 5.03628 11.5358 5.71769C11.5358 6.3991 11.0928 6.89787 11.0928 7.20929C11.0928 7.52071 12.562 8.01459 12.562 8.9053C12.562 9.79601 8.94275 10.8109 9.13974 11.65C9.33674 12.4891 10.1661 13.0785 9.43978 13.0785C8.71344 13.0785 8.50902 11.4174 7.4067 11.4174C6.30438 11.4174 5.12148 11.9181 5.33073 12.3452C5.53998 12.7722 6.61946 13.8971 7.18 13.8971C7.74054 13.8971 7.7526 15.1796 8.18354 15.4633C8.61448 15.7471 9.34555 15.8579 9.34555 15.8579C9.55079 15.8983 9.73959 15.7509 9.78605 15.5663C9.78605 15.5663 9.7493 14.7784 10.8626 14.7784C11.9758 14.7784 12.4014 15.9856 12.9625 16.2698C13.5236 16.554 14.9616 17.2439 15.1631 17.7643C15.3645 18.2847 15.0702 19.1938 14.588 19.4959C14.3102 19.67 13.9412 20.1844 13.6784 20.5892C15.6542 20.2053 17.3927 19.1567 18.6515 17.6854C17.8424 17.6223 16.6742 17.4186 16.1651 16.7606C15.4279 15.8077 16.3062 14.7433 16.6863 14.0078C17.0664 13.2724 17.8787 12.036 17.8787 11.7936C17.8787 11.5513 17.5927 11.5268 17.0866 11.1565C16.5805 10.7861 16.981 9.90471 17.4086 9.90471C17.8362 9.90471 18.7118 10.774 19.0733 10.774C19.4348 10.774 18.393 9.95484 18.393 9.10532C18.393 8.481 19.3594 8.25213 19.8717 8.17467ZM3.42516 10.2494C3.3103 10.815 3.25 11.4005 3.25 12C3.25 16.1454 6.13274 19.6175 10.0029 20.5211C10.1138 20.0621 10.3352 19.0103 10.1661 18.5346C9.94648 17.9167 8.50902 17.7395 8.50902 16.9941C8.50902 16.2487 9.33878 16.088 9.33878 16.088C9.33878 16.088 4.50761 15.7316 3.42516 10.2494ZM12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5Z"
      fill="#7C4CFF"
    />
  </svg>
);
const PersonalizedIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.2886 6.21289L18.2278 2.3713C18.6259 2.06168 19.1922 2.09694 19.5488 2.45355L22.543 5.44775C22.8997 5.80436 22.9349 6.3707 22.6253 6.76879L18.7847 11.7067C19.0778 12.895 19.0836 14.172 18.7444 15.4378C17.8463 18.7896 14.8142 20.9985 11.5016 20.9985C8 20.9985 3.5 19.4966 1 17.9966C4.97978 14.9966 4.04722 13.1864 4.5 11.4966C5.55843 7.54646 9.34224 5.23923 13.2886 6.21289ZM16.7015 8.09149C16.7673 8.15494 16.8319 8.21952 16.8952 8.28521L18.0297 9.41972L20.5046 6.23774L18.7589 4.49198L15.5769 6.96686L16.7015 8.09149Z"
      fill="#7C4CFF"
    />
  </svg>
);

const HomeFeatures = () => {
  return (
    <div className="pt-10 flex flex-col gap-[60px]">
      <div className="flex flex-col gap-6 items-center font-bricolage">
        <p className="rounded-lg px-4 py-[10px] font-medium bg-[#7C4CFF1A] text-primary">
          Why Celebration E-cards
        </p>

        <h1 className="flex flex-col items-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Discover why our E-Cards are the perfect choice for connecting with
          loved ones.
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 lg:gap-6">
        <Card
          icon={CreativityIcon}
          heading="Prompt & Convenient"
          text="Create, Customise, and send e-cards online in 60secs, eliminating the need to visit a store to purchase physical cards or to send them via post."
        />
        <Card
          icon={FastEasyIcon}
          heading="Inclusive"
          text="Connect loved ones all over the world."
        />
        <Card
          icon={HeartfeltIcon}
          heading="Instant Delivery"
          text="Receive e-card instantly, allowing for timely greetings and well wishes."
        />
        <Card
          icon={DeliveryIcon}
          heading="Cost Effective"
          text="Sending e-cards is more cost-effective than purchasing and sending physical cards, as there is no printing or postage costs involved."
        />
        <Card
          icon={ImpactIcon}
          heading="Environmental Impact"
          text="Eliminates the need for paper production and transportation by reducing carbon emissions."
        />
        <Card
          icon={PersonalizedIcon}
          heading="Personalized"
          text="Offers degree of customization, allowing senders to personalize their greetings."
        />
      </div>
    </div>
  );
};

export default HomeFeatures;

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
