import { Subscription } from "./subscription";

export interface Device extends Subscription {
    userAgent: string;
    ip: string;
}