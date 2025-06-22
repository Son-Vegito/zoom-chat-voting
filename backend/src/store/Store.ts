
export type UserId = string;

export interface Chat {
    id: number,
    senderName: string,
    senderId: UserId,
    message: string,
    //use set instead of array to avoid duplicates
    upvotes: UserId[]
}

export abstract class Store {

    constructor() {

    }
    
    initRoom(roomId: string) {

    }
    
    getChats(roomId: string, limit: number, offset: number) {

    }
    
    addChat(roomId: string, userId: UserId, name: string, message: string) {

    }
    
    upVote(roomId: string, userId: UserId, chatId: number) {

    }
}