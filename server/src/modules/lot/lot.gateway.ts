import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import type { Bet } from '../bet/types/bet.types';
  
  @WebSocketGateway({
    cors: { origin: '*' },
  })
  export class LotGateway {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {
      console.log('Client connected:', client.id);
    }
  
    handleDisconnect(client: Socket) {
      console.log('Client disconnected:', client.id);
    }
  
    @SubscribeMessage('joinLot')
    handleJoinLot(
      @MessageBody() lotId: string,
      @ConnectedSocket() client: Socket,
    ) {
      client.join(lotId);
      console.log('joined lot:', lotId);
    }

    @SubscribeMessage('leaveLot')
    handleLeaveLot(
        @MessageBody() lotId: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.leave(lotId);
    }
  
    sendLotPrice(lotId: string, price: number) {
        this.server.to(lotId).emit('lotPrice', price);
    }

    lotBets(lotId: string, bets: Bet[]) {
        this.server.to(lotId).emit('lotBets', {
          lotId,
          bets
        });
    }
  }