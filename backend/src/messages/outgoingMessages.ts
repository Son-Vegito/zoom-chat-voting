import { z } from "zod";

const chatMessage = z.object({
    type: z.literal('chat'),
    id: z.number(),
    message: z.string(),
    roomId: z.string(),
    userId: z.string(),
    userName: z.string(),
    upvotes: z.number()
})

const upVoteMessage = z.object({
    type: z.literal('upvote'),
    chatId: z.number(),
    userId: z.string(),
    roomId: z.string(),
    upvotes: z.number()
})

export type OutgoingMessageTypes = z.infer<typeof chatMessage> | 
    z.infer<typeof upVoteMessage>