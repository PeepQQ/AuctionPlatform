import { useEffect } from "react";
import { socket } from "./socket";

export const useLotRoom = (lotId: number) => {
    useEffect(() => {
      socket.emit("joinLot", lotId.toString());
  
      return () => {
        socket.emit("leaveLot", lotId.toString());
      };
    }, [lotId]);
};