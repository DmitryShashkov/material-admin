import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output
} from "@angular/core";
import {ArticleNode} from "../../../../models/ArticleNode";
import {NodeHeader} from "../../../../models/NodeHeader";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormsContract} from "../../../../contracts/forms.contract";
import {CONFIGURE_ARTICLE_HEADER_FORM_CONFIG} from "./configure-article-header.form-config";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-configure-article-header',
    templateUrl: './configure-article-header.component.html',
    styleUrls: ['./configure-article-header.component.scss'],
})
export class ConfigureArticleHeaderComponent implements OnChanges {
    @Input()
    public node: NodeHeader;

    @Output()
    public onSubmit: EventEmitter<ArticleNode> = new EventEmitter<ArticleNode>();

    public readonly FormsContract: typeof FormsContract = FormsContract;

    public nodeForm: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private zone: NgZone,
    ) {
        this.nodeForm = formBuilder.group(CONFIGURE_ARTICLE_HEADER_FORM_CONFIG);
    }

    public ngOnChanges () : void {
        // if (this.node) {
        //     this.nodeForm.controls[FormsContract.NodeHeader.TITLE].setValue(this.node.title);
        // }
    }

    public onImagePreviewError (error: Error) : void {
        // preventing ExpressionChangedAfterItHasBeenCheckedError on runtime; fault is not mine, it comes from
        // ngx-toastr, which, in their turn, draws it from material2: https://github.com/scttcper/ngx-toastr/issues/160
        window.requestAnimationFrame(() => {
            this.toastr.error(error.message);
        });
    }

    public submit () : void {
        // if (this.nodeForm.invalid) { return; }

        console.log(this.nodeForm.value);
    }
}
