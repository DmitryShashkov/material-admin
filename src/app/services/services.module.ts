import { NgModule } from '@angular/core';
import { BlogService } from './blog.service';
import { FilesService } from './files.service';
import { NotificationsService } from './notifications.service';
import { UsersService } from './users.service';
import { ConfirmationService } from './confirmation.service';

@NgModule({
    providers: [
        BlogService,
        ConfirmationService,
        FilesService,
        NotificationsService,
        UsersService,
    ],
})
export class ServicesModule { }
