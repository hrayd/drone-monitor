/**
 * 控制器Socket Hook
 * @returns { socketIsConnected: Boolean; openSocket: Function; closeSocket: Function }
 */
import { useRef, useState } from "react";
import { WEBSOCKET_URL } from "./utils";
import drones from "../stores/DroneList";
import { message } from "antd";

const useSocket = () => {
  const [socketIsConnected, setSocketStatus] = useState(false); // 控制器Socket连接状态
  const ws = useRef(); // 控制器Socket

  // 开启控制器Socket
  const openSocket = () => {
    if (ws.current) {
      return;
    }
    ws.current = new WebSocket(WEBSOCKET_URL);
    ws.current.onmessage = (e) => {
      console.log("Receive: ", e.data);
      switch (e.data) {
        case "up":
          drones.moveUp();
          break;
        case "down":
          drones.moveDown();
          break;
        case "left":
          drones.moveLeft();
          break;
        case "right":
          drones.moveRight();
          break;
        case "add":
          drones.add();
          break;
        case "clear":
          drones.clear();
          break;
        default:
          break;
      }
    };
    ws.current.onclose = () => {
      console.log("Websocket Closed");
      ws.current = null;
      setSocketStatus(false);
    };
    ws.current.onerror = () => {
      console.log("Websocket Error");
      ws.current = null;
      setSocketStatus(false);
    };
    ws.current.onopen = () => {
      console.log("Websocket Opened");
      message.success("连接成功");
      setSocketStatus(true);
    };
  };

  const closeSocket = () => {
    if (ws.current && ws.current.close) {
      ws.current.close();
      setSocketStatus(false);
      ws.current = null;
    }
  };

  return {
    socketIsConnected,
    openSocket,
    closeSocket,
  };
};

export default useSocket;
