import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormBaseComponent } from 'form-base.component'

@Component({
    selector: 'form-input',
    template: `
        <div class="item form-group" [class.bad]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <input [type]="_type" [id]="_fieldIdentifier" (change)="onValueChanged($event)" [required]="_required" [disabled]="_readonly" [class]="_className" [placeholder]="_placeholder" [(ngModel)]="_value">
                <span *ngIf="_showIcon" [class]="_iconClass"></span>
            </div>
            <div class="alert" style="padding-top:6px;padding-bottom:6px;" *ngIf="!isValid()">{{ _errorMessage }}</div>
        </div>
    `
})
export class FormInputComponent extends FormBaseComponent {

}