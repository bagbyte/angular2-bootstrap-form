import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormBaseComponent } from './form-base.component'

@Component({
    selector: 'form-static',
    template: `
        <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <p class="form-control-static">{{_value}}</p>
            </div>
        </div>
    `
})
export class FormStaticComponent extends FormBaseComponent {
}