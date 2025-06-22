import { WebSocket } from "ws";
import { UserId } from "./store/Store";
import { OutgoingMessageTypes } from "./messages/outgoingMessages";

interface User {
    name: string,
    socket: WebSocket,
    id: string
}

export class UserManager {

    private rooms: Map<string, User[]>;

    constructor() {
        this.rooms = new Map<string, []>;
    }

    addUser(roomId: string, userId: string, username: string, socket: WebSocket) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, []);
        }
        this.rooms.get(roomId)?.push({
            name: username,
            id: userId,
            socket
        })
        console.log('User added', username);
    }

    removeUser(roomId: string, userId: string) {
        const room = this.rooms.get(roomId)?.filter(({ id }) => id !== userId);
        if (room) {
            this.rooms.set(roomId, room);
        }
    }

    getUser(roomId: string, userId: UserId) {
        const user = this.rooms.get(roomId)?.find(({ id }) => id === userId);
        return user;
    }

    broadcast(roomId: string, senderId: UserId, message: OutgoingMessageTypes) {
        const room = this.rooms.get(roomId);
        if (!room) {
            console.error('Room not found');
            return;
        }

        const user = this.rooms.get(roomId)?.find(({ id }) => id === senderId);
        if (!user) {
            console.error('User not found');
            return;
        }

        console.log('broadcasting message', message);

        room.forEach(({ socket, id }) => {
            if (id !== senderId) {
                socket.send(JSON.stringify(message));
            }
        })
    }

}