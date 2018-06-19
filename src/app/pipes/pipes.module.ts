import { MegabytesPipe } from './megabytes.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    declarations: [
        MegabytesPipe,
    ],
    exports: [
        MegabytesPipe,
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
