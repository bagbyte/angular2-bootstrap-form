import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormBaseComponent } from './form-base.component'

@Component({
    selector: 'form-input',
    template: `
        <div class="item form-group" [class.has-error]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <input [type]="_type" [id]="_fieldIdentifier" (change)="_onValueChanged($event)" [required]="_required" [disabled]="_readonly" [class]="_className" [placeholder]="_placeholder" [(ngModel)]="_value">
                <span *ngIf="_showIcon" [class]="_iconClass"></span>
                <div class="help-block" *ngIf="!isValid()">{{ _errorMessage }}</div>
            </div>
        </div>
    `
})
export class FormInputComponent extends FormBaseComponent {
    _type: string

    public ngOnInit() {
        super.ngOnInit()

        this._type = this.getType()
        this._placeholder = (this._placeholder) ? this._placeholder : ''
    }

    private getType() : string {
        if (this._definition.input.isHidden())
            return 'hidden'
        if (this._definition.isTime())
            return 'time'
        if (this._definition.isDate())
            return 'date'
        if (this._definition.isDateTime())
            return 'datetime'
        return 'text'
    }
}