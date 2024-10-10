import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What's included with a card?",
    answer: (
      <ul className="list-disc list-inside">
        <li>Designs from our catalogue.</li>
        <li>Unlimited pages.</li>
        <li>Add custom text and picture.</li>
        <li>
          Customize the theme including fonts, colors, smileys and effects like
          confetti.
        </li>
        <li>Set delivery Date and Time.</li>
        <li>Delivery confirmation. </li>
        <li>Shareable link via email and text.</li>
        <li>Co-sign across unlimited pages.</li>
      </ul>
    ),
  },
  {
    question: "What is Single card purchase?",
    answer: (
      <p>
        Our Single card simplifies the card-giving process by offering a
        streamlined option where only the sender can sign and send individual
        cards.
      </p>
    ),
  },
  {
    question: "What is Group card purchase?",
    answer: (
      <p>
        Our Group Card offers a collaborative and inclusive approach to
        card-giving allowing multiple parties to contribute their messages and
        signatures.
      </p>
    ),
  },
  {
    question: "What is Bundle card purchase?",
    answer: (
      <p>
        A bundle card enables you to buy cards in large quantities at a
        discounted rate. You can utilize this bundle at any time.
      </p>
    ),
  },
  {
    question: "Does Bundle expire?",
    answer: (
      <p>
        No, bundles do not expire. You can use them anytime to create a new
        card, However, if your bundle finishes, you will need to buy additional
        card or purchase a new bundle.
      </p>
    ),
  },
  {
    question: "Can I use my bundle at anytime?",
    answer: (
      <p>
        Yes, there is no need to use all your cards in one go as you can use
        them anytime.
      </p>
    ),
  },
  {
    question: "Can I extend the date on my card to take more signatures?",
    answer: (
      <p>
        Yes, by editing the delivery time and date if the card has not been
        delivered.
      </p>
    ),
  },
  {
    question: "Can I change the recipient’s name and email?",
    answer: (
      <p>
        Yes, by updating the recipient details if the card has not been
        delivered.
      </p>
    ),
  },
  {
    question: "Can I save the card?",
    answer: (
      <p>Yes, after the card has been delivered by clicking download PDF.</p>
    ),
  },
  {
    question: "My card has not been received?",
    answer: (
      <p>
        If recipient hasn’t received the card, is either it is delivered to spam
        or there was error on the email address set. However, you can share a
        copy of the PDF with the recipient.
      </p>
    ),
  },
  {
    question: "Having issues with purchase?",
    answer: (
      <p>
        Kindly send an email to{" "}
        <span className="text-primary">hello@celebrationecards.com</span>.
      </p>
    ),
  },
];

const Faq = () => {
  return (
    <section className="flex flex-col items-center w-full gap-[60px] px-5">
      <div className="flex flex-col items-center gap-6">
        <p className="border inline-flex rounded-lg px-4 py-[10px] font-medium bg-[#7C4CFF1A] text-primary">
          FAQs
        </p>
        <h1 className="text-2xl sm:text-5xl/[60px] font-bold font-bricolage">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        {faqItems.map((item, index) => (
          <Accordion key={index} type="single" collapsible className="w-full">
            <AccordionItem
              className="border p-6 sm:text-xl/7 rounded-xl data-[state=open]:bg-[#7C4CFF1A] data-[state=open]:border-[#7C4CFF1A] transition-all"
              value={`item-${index}`}
            >
              <AccordionTrigger
                icon={
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 transition-transform duration-200"
                  >
                    <path
                      d="M12.5 11V8L16.5 12L12.5 16V13H8.5V11H12.5ZM12.5 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.5 22C6.98 22 2.5 17.52 2.5 12C2.5 6.48 6.98 2 12.5 2ZM12.5 20C16.92 20 20.5 16.42 20.5 12C20.5 7.58 16.92 4 12.5 4C8.08 4 4.5 7.58 4.5 12C4.5 16.42 8.08 20 12.5 20Z"
                      fill="#4F4F4F"
                    />
                  </svg>
                }
                className="p-0 data-[state=open]:text-[#7C4CFF] text-left"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="mt-5 text-base leading-6 text-[#4F4F4F]">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <p className="font-bricolage font-medium leading-8">
        For further enquiries, kindly get in touch with us at{" "}
        <span className="text-primary font-semibold">
          hello@celebrationecards.com 🎉
        </span>
      </p>
    </section>
  );
};

export default Faq;
