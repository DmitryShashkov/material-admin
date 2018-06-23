import { MegabytesPipe } from './megabytes.pipe';
import { NgModule } from '@angular/core';
import { FilesPipe } from './files.pipe';

@NgModule({
    imports: [],
    declarations: [
        MegabytesPipe,
        FilesPipe,
    ],
    exports: [
        MegabytesPipe,
        FilesPipe,
    ],
})
export class PipesModule {
    static forRoot () {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }
}
