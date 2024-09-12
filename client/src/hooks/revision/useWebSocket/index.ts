import { Accessor, createSignal, onCleanup } from "solid-js";

type WebSocketEventHandlers = {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

type WebSocketReturn = [
  Accessor<Array<string>>,
  sendWebSocketMessage: (message: string) => void,
  utils: {
    webSocketStatus: Accessor<string>,
    reconnectWebSocket: VoidFunction,
    closeWebSocket: VoidFunction
  }
];

type WebSocketStatus = "connecting" | "open" | "closed" | "error";

function useWebSocket(url: string): WebSocketReturn;
function useWebSocket(url: string, protocol: string | Array<string>): WebSocketReturn;
function useWebSocket(url: string, eventHandlers: WebSocketEventHandlers): WebSocketReturn;
function useWebSocket(url: string, protocol: string | Array<string>, eventHandlers: WebSocketEventHandlers): WebSocketReturn;
function useWebSocket(url: string, protocolOrEventHandlers?: string | Array<string> | WebSocketEventHandlers, eventHandlers?: WebSocketEventHandlers): WebSocketReturn {
  const [webSocketMessages, setWebSocketMessages] = createSignal<Array<string>>([]);
  const [webSocketStatus, setWebSocketStatus] = createSignal<WebSocketStatus>("connecting");
  let socket: WebSocket;
  let protocol: string | Array<string> | undefined;

  if (typeof protocolOrEventHandlers === "string" || Array.isArray(protocolOrEventHandlers)) {
    protocol = protocolOrEventHandlers;
  } else {
    eventHandlers = protocolOrEventHandlers;
  }

  function connectWebSocket() {
    setWebSocketStatus("connecting");
    socket = new WebSocket(url, protocol);

    socket.onopen = (event) => {
      setWebSocketStatus("open");
      eventHandlers?.onOpen?.(event);
    }

    socket.onclose = (event) => {
      setWebSocketStatus("closed");
      eventHandlers?.onClose?.(event);
    }
    
    socket.onerror = (event) => {
      setWebSocketStatus("error");
      eventHandlers?.onError?.(event);
    }

    socket.onmessage = (event) => {
      setWebSocketMessages((prev) => [...prev, event.data]);
      eventHandlers?.onMessage?.(event);
    }
  }

  function sendWebSocketMessage(message: string) {
    if(socket.readyState == WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.log("WebSocket is not open");
    }
  }

  function closeWebSocket() {
    if(socket) {
      socket.close();
    }
  }

  function reconnectWebSocket() {
    closeWebSocket();
    connectWebSocket();
  }

  onCleanup(() => closeWebSocket());

  return [webSocketMessages, sendWebSocketMessage, {webSocketStatus, reconnectWebSocket, closeWebSocket}]
}

export default useWebSocket;