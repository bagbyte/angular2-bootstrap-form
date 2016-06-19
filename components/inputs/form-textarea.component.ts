import { Component } from '@angular/core'
import { FormBaseComponent } from './form-base.component'

@Component({
    selector: 'form-textarea',
    template: `
        <div class="item form-group" [class.has-error]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <textarea class="form-control" rows="3" [placeholder]="_placeholder" [id]="_fieldIdentifier" [value]="_value" [disabled]="_readonly" (change)="_onValueChanged($event)" ></textarea>
               <div class="help-block">{{ _errorMessage }}</div>
            </div>
        </div>
    `
})
export class FormTextareaComponent extends FormBaseComponent {

    public ngOnInit() {
        super.ngOnInit()

        this._placeholder = (this._placeholder) ? this._placeholder : ''
    }
}