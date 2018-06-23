import { MegabytesPipe } from './megabytes.pipe';
import { NgModule } from '@angular/core';
import { FilesPipe } from './files.pipe';
import { SplitPipe } from './split.pipe';

@NgModule({
    imports: [],
    declarations: [
        MegabytesPipe,
        FilesPipe,
        SplitPipe,
    ],
    exports: [
        MegabytesPipe,
        FilesPipe,
        SplitPipe,
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
