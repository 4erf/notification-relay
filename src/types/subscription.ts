import { PushSubscription } from 'web-push';
export interface Subscription extends PushSubscription {
    topic: string;
}