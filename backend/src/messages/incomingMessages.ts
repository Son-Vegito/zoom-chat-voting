import { z } from "zod";

const joinMessage = z.object({
    type: z.literal('join-room'),
    name: z.string(),
    userId: z.string(),
    roomId: z.string()
})

const chatMessage = z.object({
    type: z.literal('chat'),
    userId: z.string(),
    roomId: z.string(),
    message: z.string()
})

const upVoteMessage = z.object({
    type: z.literal('upvote'),
    userId: z.string(),
    roomId: z.string(),
    chatId: z.number()
})


export type IncomingMessageType = z.infer<typeof joinMessage> |
    z.infer<typeof chatMessage> |
    z.infer<typeof upVoteMessage>