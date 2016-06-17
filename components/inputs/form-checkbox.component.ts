import { Component } from '@angular/core'
import { FormBaseComponent } from 'form-base.component'

@Component({
    selector: 'form-checkbox',
    template: `
        <div class="item form-group" [class.bad]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="checkbox" [id]="_fieldIdentifier" [value]="_value" [disabled]="_readonly" (change)="onValueChanged($event)" style="box-shadow:none;" class="form-control col-md-7 col-xs-12">
            </div>
            <div class="alert">{{ getError() }}</div>
        </div>
    `
})
export class FormCheckboxComponent extends FormBaseComponent {
}