import { Subscriptions } from '../types/subscriptions';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

export class CommonComponent implements OnDestroy {
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

    public ngOnDestroy () : void {
        this.clearSubscriptions();
    }
}
