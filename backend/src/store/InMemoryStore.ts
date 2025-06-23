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

        if (!this.rooms.get(roomId)) {
            this.initRoom(roomId);
        }

        const chat = {
            id: ++GlobalChatId,
            senderName: name,
            senderId: userId,
            message,
            upvotes: []
        };
        this.rooms.get(roomId)?.push(chat);
        console.log('chat added', message);

        return chat;
    }

    upVote(roomId: string, userId: UserId, chatId: number) {
        const chat = this.rooms.get(roomId)?.find(({ id }) => id === chatId);
        if (!chat) {
            console.log('chat not found');
            console.log(this.rooms);
            return null;
        }

        if (chat.upvotes.includes(userId)) {
            return;
        }
        git
        this.rooms.get(roomId)?.find(({ id }) => id === chatId)?.upvotes.push(userId);

        console.log('upvoted chat', chat);

        return chat;
    }
}