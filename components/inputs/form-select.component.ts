import { Component } from '@angular/core'
import { FormBaseComponent } from 'form-base.component'

@Component({
    selector: 'form-select',
    template: `
        <div class="item form-group" [class.bad]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <select class="form-control" rows="3" [id]="_fieldIdentifier" [disabled]="_readonly" [ngModel]="_value" (ngModelChange)="onValueChanged($event)" >
                    <option *ngIf="_placeholder">{{_placeholder}}</option>
                    <option *ngFor="let o of _values" [value]="o.id">{{o.value}}</option>
                </select>
            </div>
            <div class="alert" style="padding-top:6px;padding-bottom:6px;" *ngIf="!isValid()">{{ _errorMessage }}</div>
        </div>
    `
})
export class FormSelectComponent extends FormBaseComponent {
}