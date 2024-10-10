import { z } from "zod";

export const personaliseCardSchema = z.object({
  receiverEmail: z
    .string()
    .email({ message: "Please enter a valid email" })
    .trim(),
  senderName: z.string().min(1, "Enter the sender's name").trim(),
  receiverName: z.string().min(1, "Enter the reciever's name").trim(),
  addConfetti: z.boolean(),
  enablePrivateMessage: z.boolean(),
  sendDate: z.date(),
});
