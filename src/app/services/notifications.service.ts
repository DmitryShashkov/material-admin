import { Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationsService {
    constructor (
        private toastr: ToastrService,
    ) {
        // note: all of ToastrService methods are wrapped in 'requestAnimationFrame' (could be simple 'setTimeout'
        // actually - the point is to wait a bit to avoid possible 'ExpressionChangedAfterItHasBeenCheckedError' on
        // runtime); fault is not mine, it comes from 'ngx-toastr' itself, which, in their turn, draws it from
        // material2: https://github.com/scttcper/ngx-toastr/issues/160; using 'ChangeDetectionStrategy.OnPush' doesn't
        // help here
    }

    public success (message: string) : void {
        const callback: FrameRequestCallback = () => {
            this.toastr.success(message);
        };
        window.requestAnimationFrame(callback);
    }

    public warning (message: string) : void {
        const callback: FrameRequestCallback = () => {
            this.toastr.warning(message);
        };
        window.requestAnimationFrame(callback);
    }

    public info (message: string) : void {
        const callback: FrameRequestCallback = () => {
            this.toastr.info(message);
        };
        window.requestAnimationFrame(callback);
    }

    public error (message: string) : void {
        const callback: FrameRequestCallback = () => {
            this.toastr.error(message);
        };
        window.requestAnimationFrame(callback);
    }
}
