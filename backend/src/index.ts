import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./UserManager";
import { InMemoryStore } from "./store/InMemoryStore";
import { IncomingMessageType } from "./messages/incomingMessages";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });
const userManager = new UserManager();
const store = new InMemoryStore();

wss.on('error', console.error);

wss.on('listening', () => {
    console.log('Server is listening on PORT', PORT);
})

wss.on('connection', (ws) => {
    ws.onmessage = (data) => {
        try {            
            const parsedData = JSON.parse(data.data as string);
            console.log('Incoming Message', parsedData);
            messageHandler(ws, parsedData);
        }
        catch (e) {
            console.error('error in parsing');
            console.error(e);
        }
    }
})

function messageHandler(socket: WebSocket, message: IncomingMessageType) {

    if (message.type === 'join-room') {
        userManager.addUser(message.roomId, message.userId, message.name, socket);
    }

    else if (message.type === 'chat') {
        const user = userManager.getUser(message.roomId, message.userId);
        if (!user) {
            console.error('User not found');
            return;
        }
        const chat = store.addChat(message.roomId, message.userId, user.name, message.message)
        if(!chat){
            return;
        }
        userManager.broadcast(message.roomId, message.userId, {
            type: 'chat',
            id: chat.id,
            roomId: message.roomId,
            message: message.message,
            userId: message.userId,
            userName: user.name,
            upvotes: 0
        });
    }
    
    else if (message.type === 'upvote') {
        const chat = store.upVote(message.roomId, message.userId, message.chatId);
        if(!chat){
            return;
        }

        userManager.broadcast(message.roomId, message.userId, {
            type: 'upvote',
            roomId: message.roomId,
            chatId: message.chatId,
            userId: message.userId,
            upvotes: chat.upvotes.length
        });
    }
}