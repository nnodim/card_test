import Bundle from "../components/pricing/Bundle";
import FAQ from "../components/pricing/Faq";
import PricingPlan from "../components/pricing/PricingPlan";

const Pricing = () => {
  return (
    <main className="mt-9 md:mt-14">
      <div className="flex flex-col gap-y-14 md:gap-y-[90px] items-center w-full max-w-7xl mx-auto leading-normal mb-[90px]">
        <section className="flex flex-col gap-6 items-center w-full max-w-3xl text-center px-5">
          <p className="text-sm sm:text-base border inline-flex rounded-lg px-4 py-[10px] font-medium bg-[#7C4CFF1A] text-primary">
            Pricing Plans
          </p>
          <h1 className="text-xl sm:text-5xl/[60px] font-bold font-bricolage text-[#151419]">
            Discover our budget-friendly pricing plan.
          </h1>
        </section>
        <PricingPlan />
        <Bundle />
        <FAQ />
      </div>
    </main>
  );
};

export default Pricing;
