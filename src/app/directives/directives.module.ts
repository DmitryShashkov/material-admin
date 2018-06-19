import { NgModule } from '@angular/core';
import { FileInputDirective } from './file-input.directive';

@NgModule({
    declarations: [
        FileInputDirective,
    ],
    exports: [
        FileInputDirective,
    ],
})
export class DirectivesModule { }
