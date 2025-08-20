const baseWebsocket = <ReceivedData = any>() => {
    let ws: WebSocket | null = null;
    const handlers = new Set<(data: ReceivedData) => void>();

    const connect = (token: string, chatID: string) => {
        ws = new WebSocket(`${import.meta.env.VITE_WS_HOST}:${import.meta.env.VITE_WS_PORT}/chat/${chatID}?token=${token}`);

        ws.onmessage = (e) => {
            try {
                const rawData = e.data;
                const data: ReceivedData = JSON.parse(rawData);
                handlers.forEach(handler => handler(data));
            } catch (error) {
                console.log(error);
            }
        };

        ws.onclose = () => {
            ws = null;
        };

        ws.onerror = (e) => {
            console.error("Connection error:", e);
        };

        return ws;
    }

    const disconnect = () => {
        if (ws) {
            ws.close();
            ws = null;
            console.log("Disconnected websocket");
        }
    }

    return {
        connect: (token: string, chatID: string) => connect(token, chatID),
        disconnect: () => disconnect(),
        addHandler: (handler: (data: ReceivedData) => void) => handlers.add(handler),
        removeHandler: (handler: (data: ReceivedData) => void) => handlers.delete(handler),
        getHandlers: () => Array.from(handlers),
    };
}

export default baseWebsocket;
