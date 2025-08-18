type WsMessage = {
    type: string;
    content: string;
    reply_to?: string | null;
    media_name?: string | null;
    media_type?: string | null;
    media_size?: number | null;
    media_url?: string | null;
};

class baseWebsocket {
    private ws: WebSocket | null = null;

    constructor() {
    }

    connect(chatID: string, token: string, onMessage: (msg: any) => void) {
        this.ws = new WebSocket(`${import.meta.env.VITE_WS_HOST}:${import.meta.env.VITE_WS_PORT}/chat/${chatID}?token=${token}`);

        this.ws.onopen = () => {
            console.log("Connected to conversation:", chatID);
        };

        this.ws.onmessage = (e) => {
            console.log("New message:", e.data);
            onMessage(JSON.parse(e.data));
        };

        this.ws.onclose = () => {
            console.log("Connection closed");
        };

        this.ws.onerror = (e) => {
            console.error("Connection error:", e);
        };
    }

    sendMessage(msg: WsMessage) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(msg));
        } else {
            console.error("WebSocket is not connected!");
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export default baseWebsocket;
