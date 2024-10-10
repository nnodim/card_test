import { Link } from "react-router-dom";

export const GetStartedCTA = () => {
  return (
    <section className="py-5 md:py-20 w-full">
      <div className="bg-[#180D39] w-full max-w-7xl mx-auto shadow-lg rounded-xl flex flex-col-reverse md:flex-row justify-between gap-4 py-8 md:pt-[72px] px-8 lg:px-12 text-white font-bricolage">
        <div className="flex flex-col justify-center mx-auto items-center md:items-start gap-8 w-full max-w-[630px]">
          <h1 className="flex flex-col items-center md:block text-xl sm:text-3xl md:text-5xl lg:text-6xl font-medium md:font-bold md:leading-[60px] lg:leading-[80px] text-center md:text-left text-nowrap md:text-wrap">
            Make Every Moment Count:{" "}
            <span className="font-extrabold">
              Send E-Cards They&#39;ll Love it!
            </span>
          </h1>
          <p className="text-[20px] text-center md:text-left font-normal">
            With just a few clicks, send heartfelt greetings for any occasion.
          </p>
          <Link to={"/explore"} className="bg-primary text-white text-[20px] lg:py-[18px] pt-5 py-4 px-8 w-[175px] rounded-xl">
            Get Started
          </Link>
        </div>
        <div className="w-full max-w-[200px] md:max-w-[359.63px] mx-auto flex justify-center items-center">
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717271835700/e5d3275b-bce8-4510-86ac-7661e93e3ea0.png"
            alt="Placeholder"
            className=""
          />
        </div>
      </div>
    </section>
  );
};
