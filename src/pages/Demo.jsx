import { DemoCarousel } from "@/components/DemoCarousel";
import { Link } from "react-router-dom";

export const Demo = () => {
  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center gap-10 md:gap-y-[60px] px-6 py-14">
      <section className="flex flex-col gap-4 items-start md:items-center w-full max-w-6xl mx-auto leading-normal">
        <p className="border text-sm md:text-base rounded-lg px-4 py-[10px] font-medium bg-[#7C4CFF1A] text-primary">
          Demo
        </p>
        <h1 className="text-xl md:text-5xl font-bold font-bricolage">
          Discover how to send e-cards with ease
        </h1>
        <p className="md:text-center text-[#4F4F4F] text-sm md:text-base">
          Watch our video and experience the simplicity of sending heartfelt
          mesages in minutes! Try it now.
        </p>
      </section>
      <section className="py-5 px-5 md:px-14 flex flex-col gap-3 leading-normal demo-bg">
        <h2 className="md:text-2xl text-primary font-semibold font-bricolage">
          Preview our Demo
        </h2>

        <p className="font-medium text-xs md:text-base">
          You can explore by adding messages, images, and GIFs to experience its
          functionality. Once you create an actual card, you will have additional
          options to manage and personalize your card further.
        </p>

        <p className="leading-[24px] text-xs md:text-base font-medium">
          <Link
            to={"/explore"}
            className="text-primary underline font-bold underline-offset-4"
          >
            CREATE YOUR CARD HERE
          </Link>{" "}
        </p>
      </section>
      <section className="w-full max-w-7xl mx-auto">
        <iframe
          className="w-full h-[600px] rounded-xl"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          src="https://www.youtube.com/embed/eNTSmNY2PyY?si=bbhhAWjeKWoDsdI4"
        ></iframe>
      </section>
      <h2 className="self-start border w-fit rounded-lg px-4 py-[10px] font-medium bg-[#7C4CFF1A] text-primary">
        How it works
      </h2>
      <DemoCarousel />
    </main>
  );
};
