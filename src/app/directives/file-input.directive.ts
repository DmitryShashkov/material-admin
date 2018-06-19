import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: 'input[type=file]',
    host : {
        '(change)' : 'onChange($event.target.files[0])',
        '(blur)': 'onTouched()',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileInputDirective,
            multi: true,
        },
    ],
})
export class FileInputDirective implements ControlValueAccessor {
    public onChange: Function = () => { };
    public onTouched: Function = () => { };

    public writeValue (value: any) : void { }

    public registerOnChange (onChangeListener: Function) : void {
        this.onChange = onChangeListener;
    }

    public registerOnTouched (onTouchedListener: Function) : void {
        this.onTouched = onTouchedListener;
    }
}
