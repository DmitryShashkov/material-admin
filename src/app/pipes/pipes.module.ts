import { MegabytesPipe } from './megabytes.pipe';
import { NgModule } from '@angular/core';
import { FilesPipe } from './files.pipe';
import { SplitPipe } from './split.pipe';
import { ArticleNodesPipe } from './article-nodes.pipe';
import { TextArticleNodesPipe } from './text-article-nodes.pipe';

@NgModule({
    imports: [],
    declarations: [
        MegabytesPipe,
        FilesPipe,
        SplitPipe,
        ArticleNodesPipe,
        TextArticleNodesPipe,
    ],
    exports: [
        MegabytesPipe,
        FilesPipe,
        SplitPipe,
        ArticleNodesPipe,
        TextArticleNodesPipe,
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
