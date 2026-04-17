import type { AppAccessPayload } from '../helpers/helpers';

declare global {
  namespace Express {
    interface Request {
      user?: AppAccessPayload;
    }
  }
}