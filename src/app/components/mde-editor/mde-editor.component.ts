import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import * as SimpleMDE from 'simplemde';

@Component({
    selector: 'app-mde-editor',
    templateUrl: './mde-editor.component.html',
    styleUrls: ['./mde-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdeEditorComponent implements AfterViewInit, OnChanges {
    @ViewChild('mdeContainer')
    private mdeContainer: ElementRef;

    private editorInstance: SimpleMDE;

    @Input()
    public initialValue: string;

    @Output()
    public onValueChanged: EventEmitter<string> = new EventEmitter<string>();

    public ngAfterViewInit () : void {
        const toolbar: (string|SimpleMDE.ToolbarIcon)[] = [
            'bold', 'italic', 'unordered-list', 'link',
            {
                name: 'no-follow-link',
                action: this.insertLinkNofollow.bind(this),
                className: 'fa fa-external-link',
                title: 'Link with rel="nofollow"',
            },
            '|', 'preview', 'guide',
        ];

        const editorSettings: SimpleMDE.Options = {
            toolbar,
            element: this.mdeContainer.nativeElement,
        };

        this.editorInstance = new SimpleMDE(editorSettings);

        this.editorInstance.codemirror.on('change', () => {
            this.onValueChanged.emit(this.editorInstance.value());
        });

        this.trySetInitialValue();
    }

    public ngOnChanges () : void {
        this.trySetInitialValue();
    }

    private insertLinkNofollow () : void {
        const selectedText: string = this.editorInstance.codemirror.getSelection() || '';

        const insertion: string = `[${selectedText}](nofollow:http://)`;

        this.editorInstance.codemirror.replaceSelection(insertion);
    }

    private trySetInitialValue () : void {
        if (this.editorInstance && this.initialValue) {
            this.editorInstance.value(this.initialValue);
        }
    }
}
