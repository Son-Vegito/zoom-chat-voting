import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on('error', console.error);

wss.on('listening', ()=>{
    console.log('Server is listening on PORT', PORT);
})

wss.on('connection', (ws)=>{

})