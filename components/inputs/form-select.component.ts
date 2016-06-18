import { Component } from '@angular/core'
import { FormBaseComponent } from './form-base.component'

@Component({
    selector: 'form-select',
    template: `
        <div class="item form-group" [class.bad]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <select class="form-control" [multiple]="_multiple" rows="3" [id]="_fieldIdentifier" [disabled]="_readonly" [ngModel]="_value" (ngModelChange)="_onValueChanged($event)" >
                    <option *ngIf="_placeholder">{{_placeholder}}</option>
                    <option *ngFor="let o of _values" [value]="o.id">{{o.value}}</option>
                </select>
            </div>
            <div class="alert" style="padding-top:6px;padding-bottom:6px;" *ngIf="!isValid()">{{ _errorMessage }}</div>
        </div>
    `
})
export class FormSelectComponent extends FormBaseComponent {
    _values: Array<{id:any, value:any}> = []
    _multiple: boolean = false

    public ngOnInit() {
        super.ngOnInit()

        this._values = this._definition.input.values
        this._multiple = this._definition.isArray()

        let value = this.entity.getPropertyValue(this.property)
        if (value)
            this._value = value
        else {
            if (this._values.length > 0) {
                this._value = this._values[0].id
                this.entity.setPropertyValue(this.property, this._value);
            }
            else
                this._value = ''
        }
    }
}