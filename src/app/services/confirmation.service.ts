import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {ConfirmationComponent} from "../components/confirmation/confirmation.component";

@Injectable()
export class ConfirmationService {
    constructor (
        private dialog: MatDialog,
    ) { }

    public ask (question: string) : Observable<boolean> {
        const options: MatDialogConfig = {
            data: question,
        };

        const dialogRef: MatDialogRef<ConfirmationComponent>
            = this.dialog.open(ConfirmationComponent, options);

        return dialogRef.afterClosed();
    }
}
