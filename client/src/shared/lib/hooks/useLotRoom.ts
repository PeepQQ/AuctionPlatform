import { useEffect } from "react";
import { socket } from "./socket";

export const useLotRoom = (lotId: number) => {
    useEffect(() => {
      socket.emit("joinLot", lotId);
  
      return () => {
        socket.emit("leaveLot", lotId);
      };
    }, [lotId]);
};