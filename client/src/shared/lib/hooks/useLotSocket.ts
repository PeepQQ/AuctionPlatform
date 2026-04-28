import { useCallback } from "react";
import { socket } from "./socket";
import type { Bet } from "@/entities/bet";
import { LotStates } from "@/entities/lot";

interface onBetHandlerData {
  lotId: string;
  bet: Bet;
  totalCount: number;
}

interface onStateHandlerData {
  lotId: string;
  state: LotStates
}

interface onPriceHandlerData {
  lotId: string;
  price: number;
}

export const useLotSocket = (lotId: string) => {
  const onBet = useCallback((handler: (data: onBetHandlerData) => void) => {
    const listener = (data: onBetHandlerData) => {
      if (data.lotId !== lotId) return;
      handler(data);
    };

    socket.on("newBet", listener);

    return () => {
      socket.off("newBet", listener);
    };
  }, [lotId]);

  const onState = useCallback((handler: (data: onStateHandlerData) => void) => {
    const listener = (data: onStateHandlerData) => {
      if (data.lotId !== lotId) return;
      handler(data);
    };

    socket.on("lotState", listener);

    return () => {
      socket.off("lotState", listener);
    };
  }, [lotId]);

  const onPrice = useCallback((handler: (data: onPriceHandlerData) => void) => {
    const listener = (data: onPriceHandlerData) => {
      if (data.lotId !== lotId) return;
      handler(data);
    };

    socket.on("lotPrice", listener);

    return () => {
      socket.off("lotPrice", listener);
    };
  }, [lotId]);

  return { onBet, onState, onPrice };
};