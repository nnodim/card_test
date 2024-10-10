import { GetStartedCTA } from "@/components/GetStartedCTA";
import { CurlyArrow } from "@/components/icons/CurlyArrow";

const OurStory = () => {
  return (
    <main className="mt-14">
      <div className="flex flex-col gap-4 items-start md:items-center w-full max-w-6xl mx-auto leading-normal mb-6 p-5">
        <p className="border rounded-lg p-4 font-medium bg-[#7C4CFF1A] text-primary">
          OUR STORY
        </p>
        <h1 className="text-2xl md:text-[40px]/[48px] font-bold font-bricolage">
          Our story is laced with passion for celebrating people, fostering
          connections, and spreading joy across distances.
        </h1>
      </div>
      <section className="relative h-60 custom-background w-full flex justify-center items-center">
        <img
          className="w-full h-full object-cover absolute mix-blend-overlay"
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717256980471/84f789f3-f418-42cb-a8e6-1f85bc02b977.jpeg"
          alt="Group Photograph"
        />
        <div className="flex flex-col justify-center   text-[#FFF]  px-4 lg:px-16">
          <h1 className=" relative text-center text-4xl lg:text-6xl font-semibold">
            Our Story
          </h1>
        </div>
      </section>

      <section
        id="about"
        className="relative font-bricolage bg-[#F2EDFF] z-10 w-full py-20 my-[50px] px-4"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center md:flex-row lg:items-start gap-10 items-start md:items-center">
          <div className="flex flex-col items-start gap-2 rounded-md leading-normal">
            <p className="text-sm md:text-base bg-white w-fit px-5 py-3 text-center rounded-lg text-primary font-semibold text-nowrap">
              About Celebration E-cards
            </p>
            <h3 className="text-2xl md:text-[40px]/[48px] w-full md:max-w-[366px] font-medium text-[#7c4cff]">
              Express Your Emotions, Digitally Delivered
            </h3>
          </div>
          <div className="sm:text-[18px] text-[#242424] font-normal flex flex-col gap-8 max-w-[833px] w-full">
            <p className="text-justify">
              Ever since I was a child, I have found immense joy in celebrating
              the people around me. The act of making someone feel special
              always brought a smile to my face. As life moved forward, my
              circle of friends stretched across continents and time zones. The
              joy of seeing my friends thrive in different parts of the world
              was often mixed with the sadness of not being able to celebrate
              their milestones in person.
            </p>

            <p className="text-justify">
              I vividly remember a particular birthday of a dear friend who
              relocated. The distance made it impossible for me to deliver a
              heartfelt gift or even a hug. I felt helpless and emotional,
              wishing there was a way to bridge the gap. That was when the idea
              struck me—why not create a way for people to share in the joy of
              celebrating together, regardless of distance.
            </p>
            <p className="text-justify">
              This led to the birth of Celebration E-cards Limited, a place
              where e-cards become more than just digital greetings. They
              transform into a collective hug, a shared smile, and a surprise
              that can light up someones day. By allowing multiple people to
              co-sign these e-cards, we bring together friends and loved ones
              from all corners of the world, creating a collection of affection
              and joy without boundaries.
            </p>
            <p className="text-right ">KENNY ODLAN - Founder</p>
            <p className="text-justify font-semibold">
              YOUR CELEBRATION STARTS HERE, WITH CELEBRATION E-CARDS LIMITED!
            </p>
          </div>
        </div>
      </section>
      <section className="relative px-4 w-full max-w-7xl mx-auto py-20 flex flex-col gap-8">
        <CurlyArrow className="absolute -top-[135px] -left-[80px]" />
        <div
          id="vision"
          className="flex flex-col-reverse lg:flex-row justify-between items-center gap-y-5 gap-x-40 w-full"
        >
          <div className="w-full flex-1 flex flex-col gap-4 md:gap-9 font-bricolage leading-normal">
            <h4 className="hidden lg:block bg-[#7C4CFF14] w-fit font-semibold text-[#7C4CFF] rounded-[10px] px-5 py-2">
              Our Vision
            </h4>
            <p className="text-base sm:text-xl md:text-[28px]/[34px] font-medium w-full max-w-[730px] tracking-[2%]">
              We envision a world where every memory, from the everyday to the
              extraordinary, is captured, preserved, and celebrated in a
              personalized and meaningful way.
            </p>
          </div>
          <div className="flex-1 w-full flex justify-between items-end gap-10 font-bricolage leading-normal">
            <h4 className="lg:hidden inline-block bg-[#7C4CFF14] w-fit font-semibold text-[#7C4CFF] rounded-[10px] px-5 py-2 text-nowrap">
              Our Vision
            </h4>
            <div className="ml-auto h-auto w-full max-w-[317px] overflow-hidden">
              <img
                className="h-full w-full rounded object-cover mx-auto object-center"
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717260879671/373f8f77-25db-4528-9218-2398b632d6b2.png"
                alt="International women's day banner"
              />
            </div>
          </div>
        </div>
        <div className="font-bricolage flex flex-col lg:flex-row justify-between items-center  gap-y-5">
          <div className="flex-1 w-full flex justify-between items-end gap-10 font-bricolage leading-normal">
            <div className="h-auto w-full max-w-[476px] overflow-hidden">
              <img
                className="h-full w-full rounded object-cover object-center"
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717261411574/b9d930c6-4aea-4df5-9243-c902be7964f6.png"
                alt="International women's day banner"
              />
            </div>
            <h4 className="lg:hidden inline-block text-[#F5F1FF] w-fit font-semibold bg-[#7C4CFF] rounded-md px-5 py-2 text-nowrap">
              Our Mission
            </h4>
          </div>
          <div
            className="w-full flex-1 flex flex-col gap-4 md:gap-9 font-bricolage leading-normal"
            id="mission"
          >
            <h4 className="hidden lg:inline-block text-[#F5F1FF] w-fit font-semibold bg-[#7C4CFF] rounded-md px-5 py-2">
              Our Mission
            </h4>
            <p className="text-base sm:text-xl md:text-[28px]/[34px] font-medium w-full max-w-[730px] tracking-[2%]">
              Our mission is to revolutionize how special moments are
              meaningfully celebrated.
            </p>
          </div>
        </div>
      </section>
      <section
        id="principle"
        className="bg-[#7C4CFF33] font-bricolage lg:px-4 pb-20 lg:py-20 my-6 lg:my-[50px]"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center">
          <div className="hidden lg:flex flex-col justify-center items-center mb-[70px] gap-2 leading-normal">
            <h3 className="text-[40px] font-medium tracking-[0.8px]">
              Our Core Principle
            </h3>
            <p className="text-[24px] tracking-[0.48px] text-[#4F4F4F]">
              At the core of our vision and mission lies the following
              principles
            </p>
          </div>
          <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:max-w-[629px] gap-x-10 gap-y-6 lg:gap-y-[60px] px-5 lg:px-0">
              <div className="lg:hidden max-w-lg mx-auto md:items-center flex flex-col justify-center items-start mb-5 gap-6 leading-normal">
                <h3 className="text-2xl font-bold tracking-[0.8px]">
                  Our Core Principle
                </h3>
                <p className="text-lg  md:text-center tracking-[0.48px] text-[#4F4F4F]">
                  At the core of our vision and mission lies the following
                  principles
                </p>
              </div>
              <div className="w-full leading-normal mx-auto bg-white lg:bg-inherit p-6 md:p-8 lg:p-0 rounded-xl max-w-lg flex flex-col items-center lg:items-start shadow-lg lg:shadow-none">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.5"
                    width="100"
                    height="100"
                    rx="12"
                    fill="#7C4CFF"
                    fillOpacity="0.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M52.6673 31.8335C52.6673 33.3082 51.4727 34.5002 50.0007 34.5002C48.5287 34.5002 47.334 33.3082 47.334 31.8335V26.5002C47.334 25.0255 48.5287 23.8335 50.0007 23.8335C51.4727 23.8335 52.6673 25.0255 52.6673 26.5002V31.8335ZM36.6673 50.5002C36.6673 43.1482 42.6486 37.1668 50.0006 37.1668C57.3526 37.1668 63.334 43.1482 63.334 50.5002C63.334 54.7108 61.3233 58.6655 58.0006 61.1562V71.8335C58.0006 74.7748 55.6087 77.1668 52.6673 77.1668H47.334C44.3926 77.1668 42.0006 74.7748 42.0006 71.8335V61.1562C38.6753 58.6655 36.6673 54.7108 36.6673 50.5002ZM74.0007 47.8335H68.6673C67.1927 47.8335 66.0007 49.0255 66.0007 50.5002C66.0007 51.9748 67.1927 53.1668 68.6673 53.1668H74.0007C75.4753 53.1668 76.6673 51.9748 76.6673 50.5002C76.6673 49.0255 75.4753 47.8335 74.0007 47.8335ZM26.0007 47.8335H31.334C32.806 47.8335 34.0007 49.0255 34.0007 50.5002C34.0007 51.9748 32.806 53.1668 31.334 53.1668H26.0007C24.5287 53.1668 23.334 51.9748 23.334 50.5002C23.334 49.0255 24.5287 47.8335 26.0007 47.8335ZM38.4265 35.6148L34.5892 31.9082C33.5305 30.8868 31.8452 30.9188 30.8185 31.9775C29.7945 33.0335 29.8239 34.7242 30.8825 35.7482L34.7199 39.4522C35.2399 39.9535 35.9065 40.2015 36.5732 40.2015C37.2719 40.2015 37.9678 39.9268 38.4905 39.3855C39.5145 38.3295 39.4852 36.6388 38.4265 35.6148ZM65.4124 31.9127C66.4684 30.8914 68.1644 30.9207 69.1804 31.9767C70.2044 33.0327 70.175 34.7234 69.1164 35.7447L65.279 39.4514C64.7644 39.95 64.0951 40.2007 63.4284 40.2007C62.7297 40.2007 62.0311 39.926 61.5111 39.3847C60.487 38.3287 60.5164 36.638 61.5751 35.6167L65.4124 31.9127Z"
                    fill="#7C4CFF"
                  />
                </svg>

                <h3 className="text-[#5630C2] mt-5 mb-3 text-lg font-medium tracking-[0.4px]">
                  Creativity & Variety
                </h3>
                <p className="text-[#242424] tracking-[0.32px] w-full text-center lg:text-left">
                  We offer a diverse range of e-card templates, each
                  thoughtfully designed to suit different occasions and
                  preferences
                </p>
              </div>
              <div className="w-full leading-normal mx-auto bg-white lg:bg-inherit p-6 md:p-8 lg:p-0 rounded-xl max-w-lg flex flex-col items-center lg:items-start shadow-lg lg:shadow-none">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.5"
                    width="100"
                    height="100"
                    rx="12"
                    fill="#7C4CFF"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M58.0007 79.1668H42.0007C27.5207 79.1668 21.334 72.9802 21.334 58.5002V42.5002C21.334 28.0202 27.5207 21.8335 42.0007 21.8335H58.0007C72.4807 21.8335 78.6673 28.0202 78.6673 42.5002V58.5002C78.6673 72.9802 72.4807 79.1668 58.0007 79.1668ZM42.0007 25.8335C29.7073 25.8335 25.334 30.2068 25.334 42.5002V58.5002C25.334 70.7935 29.7073 75.1668 42.0007 75.1668H58.0007C70.294 75.1668 74.6673 70.7935 74.6673 58.5002V42.5002C74.6673 30.2068 70.294 25.8335 58.0007 25.8335H42.0007Z"
                    fill="#7C4CFF"
                  />
                  <path
                    d="M41.5205 44.5002C39.2538 44.5002 36.9872 43.6468 35.2538 41.9135C34.4805 41.1402 34.4805 39.8602 35.2538 39.0868C36.0272 38.3135 37.3072 38.3135 38.0805 39.0868C39.9738 40.9802 43.0672 40.9802 44.9605 39.0868C45.7338 38.3135 47.0138 38.3135 47.7872 39.0868C48.5605 39.8602 48.5605 41.1402 47.7872 41.9135C46.0538 43.6202 43.7872 44.5002 41.5205 44.5002Z"
                    fill="#7C4CFF"
                  />
                  <path
                    d="M58.4795 44.5002C56.2128 44.5002 53.9461 43.6468 52.2128 41.9135C51.4395 41.1402 51.4395 39.8602 52.2128 39.0868C52.9861 38.3135 54.2661 38.3135 55.0395 39.0868C56.9328 40.9802 60.0261 40.9802 61.9195 39.0868C62.6928 38.3135 63.9728 38.3135 64.7461 39.0868C65.5195 39.8602 65.5195 41.1402 64.7461 41.9135C63.0128 43.6202 60.7461 44.5002 58.4795 44.5002Z"
                    fill="#7C4CFF"
                  />
                  <path
                    d="M50 69.5665C42.2667 69.5665 36 63.2732 36 55.5665C36 53.1398 37.9733 51.1665 40.4 51.1665H59.6C62.0267 51.1665 64 53.1398 64 55.5665C64 63.2732 57.7333 69.5665 50 69.5665ZM40.4 55.1665C40.1867 55.1665 40 55.3532 40 55.5665C40 61.0865 44.48 65.5665 50 65.5665C55.52 65.5665 60 61.0865 60 55.5665C60 55.3532 59.8133 55.1665 59.6 55.1665H40.4Z"
                    fill="#7C4CFF"
                  />
                </svg>

                <h3 className="text-[#5630C2] mt-5 mb-3 text-lg font-medium tracking-[0.4px]">
                  Gratitude & Appreciation
                </h3>
                <p className="text-[#242424] tracking-[0.32px] w-full text-center lg:text-left">
                  We understand the importance of expressing gratitude and
                  appreciation, which is why we facilitate seamless
                  communication between senders and recipients.{" "}
                </p>
              </div>
              <div className="w-full leading-normal mx-auto bg-white lg:bg-inherit p-6 md:p-8 lg:p-0 rounded-xl max-w-lg flex flex-col items-center lg:items-start shadow-lg lg:shadow-none">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.5"
                    width="100"
                    height="100"
                    rx="12"
                    fill="#7C4CFF"
                    fillOpacity="0.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M40.8147 61.1668C39.9987 61.1668 39.332 60.5028 39.332 59.6842V39.8335H59.1854C60.0014 39.8335 60.6654 40.4975 60.6654 41.3162V61.1668H40.8147ZM73.9987 61.1668H65.9987V41.3162C65.9987 37.5562 62.9427 34.5002 59.1854 34.5002H39.332V26.5002C39.332 25.0255 38.14 23.8335 36.6654 23.8335C35.1934 23.8335 33.9987 25.0255 33.9987 26.5002V34.5002H25.9987C24.5267 34.5002 23.332 35.6922 23.332 37.1668C23.332 38.6415 24.5267 39.8335 25.9987 39.8335H33.9987V59.6842C33.9987 63.4442 37.0574 66.5002 40.8147 66.5002H60.6654V74.5002C60.6654 75.9748 61.86 77.1668 63.332 77.1668C64.8067 77.1668 65.9987 75.9748 65.9987 74.5002V66.5002H73.9987C75.4734 66.5002 76.6654 65.3082 76.6654 63.8335C76.6654 62.3588 75.4734 61.1668 73.9987 61.1668Z"
                    fill="#7C4CFF"
                  />
                </svg>

                <h3 className="text-[#5630C2] mt-5 mb-3 text-lg font-medium tracking-[0.4px]">
                  Convinience & Flexibility
                </h3>
                <p className="text-[#242424] tracking-[0.32px] w-full text-center lg:text-left">
                  Our platform streamline the e-card sending process, with
                  features such as scheduling delivery times, and receiving
                  notifications.
                </p>
              </div>
              <div className="w-full leading-normal mx-auto bg-white lg:bg-inherit p-6 md:p-8 lg:p-0 rounded-xl max-w-lg flex flex-col items-center lg:items-start shadow-lg lg:shadow-none">
                <div className="">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="100"
                      height="100"
                      rx="12"
                      fill="#7C4CFF"
                      fillOpacity="0.2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.6673 66.5C32.6673 67.9693 33.862 69.1667 35.334 69.1667C36.806 69.1667 38.0007 67.9693 38.0007 66.5C38.0007 65.0307 36.806 63.8333 35.334 63.8333C33.862 63.8333 32.6673 65.0307 32.6673 66.5ZM32.6673 34.5C32.6673 35.9693 33.862 37.1667 35.334 37.1667C36.806 37.1667 38.0007 35.9693 38.0007 34.5C38.0007 33.0307 36.806 31.8333 35.334 31.8333C33.862 31.8333 32.6673 33.0307 32.6673 34.5ZM71.8833 29.9453C72.926 30.9853 72.9313 32.6707 71.8887 33.716L42.5713 63.14C43.0487 64.1667 43.334 65.2973 43.334 66.5C43.334 70.9107 39.7447 74.5 35.334 74.5C30.9233 74.5 27.334 70.9107 27.334 66.5C27.334 62.0893 30.9233 58.5 35.334 58.5C36.5953 58.5 37.7687 58.82 38.8327 59.3373L47.6007 50.5373L38.782 41.7187C38.7777 41.7158 38.7757 41.7115 38.7736 41.7069C38.7717 41.7028 38.7697 41.6984 38.766 41.6947C37.7233 42.196 36.5687 42.5 35.334 42.5C30.9233 42.5 27.334 38.9107 27.334 34.5C27.334 30.0893 30.9233 26.5 35.334 26.5C39.7447 26.5 43.334 30.0893 43.334 34.5C43.334 35.732 43.03 36.8893 42.5287 37.932C42.534 37.9373 42.5393 37.9403 42.5447 37.9433C42.5473 37.9447 42.55 37.9462 42.5527 37.948L51.366 46.7587L68.1127 29.9507C69.1527 28.9107 70.838 28.9053 71.8833 29.9453ZM54.782 53.948C55.8247 52.9053 57.51 52.9053 58.5527 53.948L71.886 67.2813C72.9287 68.324 72.9287 70.0093 71.886 71.052C71.366 71.572 70.6833 71.8333 70.0007 71.8333C69.318 71.8333 68.6353 71.572 68.1153 71.052L54.782 57.7187C53.7393 56.676 53.7393 54.9907 54.782 53.948Z"
                      fill="#7C4CFF"
                    />
                  </svg>
                </div>
                <h3 className="text-[#5630C2] mt-5 mb-3 text-lg font-medium tracking-[0.4px]">
                  Personalization & Customization
                </h3>
                <p className="text-[#242424] tracking-[0.32px] w-full text-center lg:text-left">
                  We believe that every message is unique, which is why we
                  provide robust tools for personalization.
                </p>
              </div>
            </div>
            <div className="w-full lg:max-w-[576px] h-[576px] lg:rounded-[20px] overflow-hidden">
              <img
                className="h-full w-full object-cover object-center lg:rounded-[20px]"
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717262645442/aed3df58-938a-4aba-b352-72a1adb5b180.png"
                alt="Core principle"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="px-[10px]">
        <GetStartedCTA />
      </div>
    </main>
  );
};

export default OurStory;
