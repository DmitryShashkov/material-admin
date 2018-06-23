import { Subscription } from 'rxjs/Subscription';

export interface Subscriptions {
    [key: string]: Subscription;
}
