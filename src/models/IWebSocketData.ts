import { User } from "./IUser";

export interface WebSocketData {
  user?: User;
  error?: string;
}
