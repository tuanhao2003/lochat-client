import type { WsChatSendData, WsChatReceiveData } from "@/types/wsChatMessage";
import baseWebsocket from "@/services/baseWebsocket";
import { MESSAGE_TYPE } from "@/constants/messageType";

const wsChat = (chatID: string, token: string) => {
    const baseWs = baseWebsocket<WsChatReceiveData>();
    let ws: WebSocket | null = baseWs.connect(token, chatID);

    const sendTextMessageHandler = (message: string) => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
            ws = baseWs.connect(token, chatID);
        }

        const sendData: WsChatSendData = { type: MESSAGE_TYPE.TEXT, content: message };

        if (ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(sendData));
        } else {
            ws!.onopen = () => ws!.send(JSON.stringify(sendData));
        }
    };

    const receiveMessageHandlerAdd = (handler: (data: WsChatReceiveData) => void) => {
        baseWs.addHandler(handler)
    };
    const receiveMessageHandlerRemove = (handler: (data: WsChatReceiveData) => void) => {
        baseWs.removeHandler(handler)
    };

    const closeConnection = () => {
        baseWs.disconnect();
        ws = null;
    };

    return { sendTextMessageHandler, receiveMessageHandlerAdd, receiveMessageHandlerRemove, closeConnection };
};

export { wsChat };
