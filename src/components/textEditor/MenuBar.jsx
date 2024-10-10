import { useTextCommands } from "@/hooks/useTextCommands";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  Strikethrough,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropTypes from "prop-types";
import { memo } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { fonts } from "@/lib/constants";

const MemoButton = memo(Button);
const MemoDropdownMenu = memo(DropdownMenu);
const MemoDropdownMenuContent = memo(DropdownMenuContent);
const MemoDropdownMenuItem = memo(DropdownMenuItem);
const MemoDropdownMenuTrigger = memo(DropdownMenuTrigger);

export const MenuBar = ({ editor, bgColor, fontSizes }) => {
  const commands = useTextCommands(editor);

  const getFontSize = () => {
    if (!editor) return "16";
    const fontSize = editor.getAttributes("textStyle").fontSize;
    if (!fontSize) return "16";

    // Handle potential object cases
    if (typeof fontSize === "object") return "16";

    // Extract number from string (e.g., "16px" -> "16")
    return fontSize.toString().split("px")[0] || "16";
  };

  const getBgColor = () => {
    if (!editor) return "#ffffff";
    const color = editor.getAttributes("textStyle").backgroundColor;
    if (!color || color === "transparent") return "#ffffff";

    if (typeof color === "object") return "#ffffff";

    return color;
  };

  return (
    <div className="absolute -top-28 bg-white flex flex-col border">
      <div className="flex">
        <div className="border-r w-1/2 border-[#7C4CFF1A] border-b flex">
          <MemoButton
            type="button"
            onClick={commands.textJustify}
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .selectAll()
                .setTextAlign("justify")
                .run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black": editor.isActive(
                {
                  textAlign: "justify",
                }
              ),
            })}
          >
            <AlignJustify className="h-4 w-4" />
          </MemoButton>
          <MemoButton
            type="button"
            onClick={commands.textCenter}
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .selectAll()
                .setTextAlign("center")
                .run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black": editor.isActive(
                {
                  textAlign: "center",
                }
              ),
            })}
          >
            <AlignCenter className="h-4 w-4" />
          </MemoButton>
          <MemoButton
            type="button"
            onClick={commands.textLeft}
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .selectAll()
                .setTextAlign("left")
                .run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black": editor.isActive(
                {
                  textAlign: "left",
                }
              ),
            })}
          >
            <AlignLeft className="h-4 w-4" />
          </MemoButton>
          <MemoButton
            type="button"
            onClick={commands.textRight}
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .selectAll()
                .setTextAlign("right")
                .run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black": editor.isActive(
                {
                  textAlign: "right",
                }
              ),
            })}
          >
            <AlignRight className="h-4 w-4" />
          </MemoButton>
        </div>
        <div className="border-b border-[#7C4CFF1A] flex">
          <MemoButton
            type="button"
            onClick={commands.bold}
            disabled={
              !editor.can().chain().focus().selectAll().toggleBold().run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black":
                editor.isActive("bold"),
            })}
          >
            <Bold className="h-4 w-4" />
          </MemoButton>
          <MemoButton
            type="button"
            onClick={commands.italic}
            disabled={
              !editor.can().chain().focus().selectAll().toggleItalic().run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black":
                editor.isActive("italic"),
            })}
          >
            <Italic className="h-4 w-4" />
          </MemoButton>
          <MemoButton
            type="button"
            onClick={commands.strikethrough}
            disabled={
              !editor.can().chain().focus().selectAll().toggleStrike().run()
            }
            className={cn("bg-white text-black hover:bg-white px-3", {
              "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black":
                editor.isActive("strike"),
            })}
          >
            <Strikethrough className="h-4 w-4" />
          </MemoButton>
          <MemoDropdownMenu>
            <MemoDropdownMenuTrigger asChild>
              <Button variant="outline" className="border-none">
                {getFontSize()}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </MemoDropdownMenuTrigger>
            <MemoDropdownMenuContent className="w-fit">
              <ScrollArea className="w-full h-80">
                {fontSizes.map((size) => (
                  <MemoDropdownMenuItem
                    key={size}
                    onClick={() => commands.fontSize(`${size}px`)}
                    className={cn("bg-white text-black hover:bg-white px-3", {
                      "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black":
                        editor.isActive("textStyle", { fontSize: `${size}px` }),
                    })}
                  >
                    {size}
                  </MemoDropdownMenuItem>
                ))}
              </ScrollArea>
            </MemoDropdownMenuContent>
          </MemoDropdownMenu>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 flex justify-end flex-col border-r border-[#7C4CFF1A] pl-3">
          <label className="text-xs text-[#A5A5A5]" htmlFor="font-family">
            Font
          </label>
          <MemoDropdownMenu>
            <MemoDropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-none capitalize p-0 justify-start rounded-none"
                style={{
                  fontFamily:
                    editor?.getAttributes("textStyle")?.fontFamily ||
                    "sans-serif",
                }}
              >
                {editor?.getAttributes("textStyle")?.fontFamily || "sans-serif"}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </MemoDropdownMenuTrigger>
            <MemoDropdownMenuContent className="w-fit">
              <ScrollArea className="w-full h-80">
                {fonts.map((font) => (
                  <MemoDropdownMenuItem
                    style={{ fontFamily: font }}
                    key={font}
                    onClick={() => commands.fontFamily(font)}
                    className={cn("bg-white text-black hover:bg-white px-3", {
                      "bg-[#7C4CFF1A] hover:bg-[#7C4CFF1A] text-black":
                        editor.isActive("textStyle", { fontFamily: font }),
                    })}
                  >
                    {font}
                  </MemoDropdownMenuItem>
                ))}
              </ScrollArea>
            </MemoDropdownMenuContent>
          </MemoDropdownMenu>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="flex flex-col gap-1 items-center">
            <label
              htmlFor="color"
              className="text-[#A5A5A5] text-xs text-center"
            >
              Text Color
            </label>
            <input
              className="h-4"
              type="color"
              name="color"
              value={editor.getAttributes("textStyle").color || "#000000"}
              onInput={commands.color}
              data-testid="setColor"
              id="color"
            />
          </div>
          {bgColor && (
            <div className="flex flex-col gap-1 items-center">
              <label
                htmlFor="bgcolor"
                className="text-[#A5A5A5] text-xs text-center"
              >
                Background Color
              </label>
              <input
                className="h-4 w-"
                type="color"
                name="bgcolor"
                onInput={commands.backgroundColor}
                value={getBgColor()}
                data-testid="setBgColor"
                id="bgcolor"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  editor: PropTypes.object,
  bgColor: PropTypes.bool,
  fontSizes: PropTypes.array,
};

export default MenuBar;
