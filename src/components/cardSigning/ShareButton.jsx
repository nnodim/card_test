import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "../ui/button";
import { Check, Copy, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ShareButton = () => {
  const [copied, setCopied] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  const onCopyText = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset status after 2 seconds
  };
  return (
    <div
      className={cn(
        "bg-white relative w-full border border-primary text-primary px-6 py-[14px] font-bold rounded-xl transition-all h-[100px] flex justify-between items-center",
        {
          "md:py-6 py[14px] h-auto": !showCopy,
        }
      )}
    >
      <Button
        onClick={() => setShowCopy(!showCopy)}
        disabled={showCopy}
        variant="link"
        className={cn(
          "w-fit md:text-xl/6 disabled:opacity-100 hover:no-underline hover:text-[#000066] flex items-center transition-all p-0 mx-auto h-auto",
          {
            "md:text-xs h-auto absolute top-[14px] left-6": showCopy,
          }
        )}
      >
        <Send className={`mr-2 ${showCopy ? "w-4 h-4" : "w-6 h-6 "}`} />
        Share Card Link
      </Button>

      <span
        className={cn(
          "font-bricolage text-primary absolute top-[14px] right-6 opacity-0 transition-all",
          {
            "opacity-100": copied,
          }
        )}
      >
        Copied!
      </span>
      <div
        className={cn(
          "w-full py-[10px] px-5 border border-[#7C4CFF52] rounded-lg mt-7 flex gap-11 items-center",
          {
            hidden: !showCopy,
          }
        )}
      >
        <input
          type="text"
          className="w-full text-[#000066] text-sm md:text-base"
          value={window.location.href}
          readOnly
        />
        <CopyToClipboard text={window.location.href} onCopy={onCopyText}>
          <Button
            className="w-fit h-auto p-0"
            variant="link"
            type="button"
            disabled={copied}
            onClick={() => setCopied(true)}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};
