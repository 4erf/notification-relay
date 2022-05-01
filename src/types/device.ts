import { PushSubscription } from "web-push";

export interface Device extends PushSubscription {
    userAgent: string;
}