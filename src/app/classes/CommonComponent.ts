import { Subscriptions } from '../types/subscriptions';
import { Subscription } from 'rxjs/Subscription';

export class CommonComponent {
    protected subscriptions: Subscriptions = { };

    protected updateSubscription (alias: string, newSubscription: Subscription) : void {
        const previousSubscription: Subscription = this.subscriptions[alias];

        if (previousSubscription) {
            previousSubscription.unsubscribe();
        }

        this.subscriptions[alias] = newSubscription;
    }

    protected clearSubscriptions () : void {
        for (const key in this.subscriptions) {
            this.subscriptions[key].unsubscribe();
        }
    }
}
