import useAuthStore from "@/hooks/useAuthStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { DeleteSignatureModal } from "./DeleteSignatureModal";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);

const existingToken = localStorage.getItem("userToken");

export const SideSignatureList = ({
  messages,
  handleEdit,
  purchaseId,
  queryClient,
  card,
}) => {
  const { user } = useAuthStore();
  const isCardOwner = user?.id === card?.user;
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        className="bg-white shadow-none border border-primary text-primary p-4 md:p-6 h-auto font-bold rounded-xl w-full"
        value={`item`}
      >
        <AccordionTrigger className="p-0 hover:no-underline hover:text-[#000066] md:text-2xl/7 w-full">
          <p className="w-full flex font-bold font-bricolage">
            <span>Signatures</span>
            <span className="mx-auto">{messages?.length}</span>
          </p>
        </AccordionTrigger>
        <AccordionContent className="mt-8 text-base leading-6 text-[#4F4F4F] border-t py-8 w-full">
          <ScrollArea className="h-80 w-full">
            {messages?.length ? (
              messages.map(
                ({
                  id,
                  message,
                  name,
                  x,
                  y,
                  width,
                  height,
                  page,
                  createdAt,
                  userToken,
                  content,
                  type,
                }) => {
                  return(
                  <div key={id} className="flex items-center gap-4 mb-4 w-full">
                    {type === "image" && (
                      <div className="w-10 h-10 shrink-0">
                        <img
                          src={content}
                          alt=""
                          className="w-full h-full object-cover object-center rounded-lg"
                        />
                      </div>
                    )}
                    <div className="w-full">
                      <div className="flex items-center justify-between gap-4 w-full">
                        <Button
                          variant="link"
                          type="button"
                          disabled={!(isCardOwner || userToken === existingToken)}
                          onClick={() =>
                            handleEdit(id, { x, y }, { width, height })
                          }
                          className="p-0 overflow-hidden bg-inherit text-ellipsis font-bold text-xl text-primary"
                        >
                          {type === "text"
                            ? `${message.slice(0, 20)}...`
                            : "Image"}
                        </Button>
                        <DeleteSignatureModal
                          signatureId={id}
                          purchaseId={purchaseId}
                          disabled={!(isCardOwner || userToken === existingToken)}
                          queryClient={queryClient}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4 w-full text-[#333333] font-normal">
                        {type === "text" && (
                          <p>
                            <span className="text-[#33333375] font-light">
                              Signed by:
                            </span>{" "}
                            <span>{name}</span>
                          </p>
                        )}
                        <span>
                          Page {page} -{" "}
                          {dayjs(createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              )
            ) : (
              <p>You have no signatures</p>
            )}
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

SideSignatureList.propTypes = {
  messages: PropTypes.array,
  handleEdit: PropTypes.func,
  purchaseId: PropTypes.string,
  card: PropTypes.object,
  queryClient: PropTypes.object,
};
