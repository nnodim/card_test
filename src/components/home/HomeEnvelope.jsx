import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { curlyArrow } from "@/assets";

const HomeEnvelope = () => {
  return (
    <div className="items-center font-bricolage">
      <div className="flex flex-col text-[#151419]  lg:leading-normal items-center gap-4 w-full">
        <h1 className="flex justify-center items-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold md:mb-4 text-center leading-tight w-full text-nowrap">
          Make Every
          <span className="rounded-full lg:py-2 px-4 mx-2 bg-[#7C4DFF] text-white">
            Moment
          </span>
          Count
        </h1>

        <h2 className="lg:text-5xl text-xl font-bold text-center">
          Spread happiness and love with our E-card
        </h2>
        <p className="lg:text-xl text-[#333] text-base text-center md:mt-6">
          With just a few clicks, send heartfelt greetings for any occasion
        </p>
        <Link to="/explore" className="md:mt-6">
          <Button className="bg-primary h-auto leading-6 flex justify-center items-center text-white text-xl md:py-[18px] py-3 px-8 rounded-xl font-normal">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="relative flex items-center justify-center mt-10 md:mt-0">
        <img
          src={curlyArrow}
          className="absolute md:-top-28 md:right-12 -top-10 right-0 w-[132px] md:w-auto"
          alt=""
        />
        <div className="absolute top-16 lg:-left-14 left-1">
          <div className="md:-left-28 w-7 h-7 md:w-[64px] md:h-[64px]">
            <img
              className="w-full h-full object-cover object-center"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1720166615575/732bc6cc-dd6a-45e9-8d27-2af6125fc012.png"
              alt=""
            />
          </div>
          <p className="text-[10px] sm:text-xs md:text-base">Family</p>
        </div>
        <div className="absolute" style={{ top: "80%", left: "-7px" }}>
          <div className="w-7 h-7 md:w-[64px] md:h-[64px]">
            <img
              className="w-full h-full object-cover object-center"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1720168109323/7d31e185-a0f0-4079-a9e7-fa883c96c254.png"
              alt=""
            />
          </div>
          <p className="text-[10px] sm:text-xs md:text-base">Friends</p>
        </div>
        <div className="absolute top-16 md:-right-10 -right-1 flex flex-col-reverse items-center gap-0.5">
          <div className="w-7 h-7 md:w-[64px] md:h-[64px]">
            <img
              className="w-full h-full object-cover object-center"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717423185320/4fe86041-92c0-4e24-b694-77e1b48abee1.png"
              alt=""
            />
          </div>
          <p className="text-[10px] sm:text-xs md:text-base">Colleague</p>
        </div>
        <div className="absolute" style={{ bottom: "10%", right: "-1%" }}>
          <div className="w-7 h-7 md:w-[64px] md:h-[64px]">
            <img
              className="w-full h-full object-cover object-center"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717423432257/79124c07-4d78-4629-bf3d-e64a0f3cfc42.png"
              alt=""
            />
          </div>
          <p className="text-[10px] sm:text-xs md:text-base">Peter</p>
        </div>
        <div className="relative flex justify-center items-center mt-[50px]">
          <div className="w-full min-h-72 min-w-[200px] max-w-[299px] sm:max-w-sm md:max-w-md lg:max-w-[500px] xl:max-w-xl">
            <img
              className="w-full h-full object-cover object-center"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717418850575/35c6dbb2-290b-4ac0-aaf2-bed1a55dea62.png"
              alt=""
            />
          </div>
          <Realistic
            className="w-full absolute"
            autorun={{ speed: 0.3 }}
            decorateOptions={(opt) => ({
              ...opt,
              spread: 120,
              ticks: 300,
              particleCount: 10,
              startVelocity: 15,
              gravity: 0.4,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeEnvelope;
