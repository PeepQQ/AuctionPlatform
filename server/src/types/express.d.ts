import type { AppAccessPayload } from '../helpers/helpers';
import type { Lot } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: AppAccessPayload;
      lot: Lot
    }
  }
}