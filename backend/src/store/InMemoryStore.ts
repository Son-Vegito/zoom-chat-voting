import { Chat, Store, UserId } from "./Store";

let GlobalChatId = 0;

export class InMemoryStore implements Store {

    private rooms: Map<string, Chat[]>;

    constructor() {
        this.rooms = new Map<string, Chat[]>();
    }

    initRoom(roomId: string) {
        this.rooms.set(roomId, []);
    }

    getChats(roomId: string, limit: number, offset: number) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return [];
        }
        const chats = room.slice(room.length - limit - offset, room.length - offset);
        return chats;
    }

    addChat(roomId: string, userId: UserId, name: string, message: string) {
        this.rooms.get(roomId)?.push({
            id: ++GlobalChatId,
            senderName: name,
            senderId: userId,
            message,
            upVotes: [],
            downVotes: []
        })
    }

    upVote(roomId: string, userId: UserId, chatId: number) {
        this.rooms.get(roomId)?.find(({ id }) => id === chatId)?.upVotes.push(userId);
    }

    downVote(roomId: string, userId: UserId, chatId: number) {
        this.rooms.get(roomId)?.find(({ id }) => id === chatId)?.downVotes.push(userId);
    }
}