import { Component } from '@angular/core'
import { FormBaseComponent } from './form-base.component'

@Component({
    selector: 'form-checkbox',
    template: `
        <div class="item form-group" [class.has-error]="!isValid()">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" [attr.for]="_fieldIdentifier">{{ _label }} <span *ngIf="_required" class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <input *ngIf="_isBoolean" type="checkbox" [id]="_fieldIdentifier" [value]="_value" [disabled]="_readonly" (change)="_onValueChanged($event)" style="box-shadow:none;" class="form-control col-md-7 col-xs-12">
                <div *ngIf="!_isBoolean" [class]="_type" *ngFor="let _choice of _choices">
                    <label>
                        <input [type]="_type" [value]="_choice.id"> {{_choice.value}}
                    </label>
                </div>
                <div class="help-block">{{ getError() }}</div>
            </div>
        </div>
    `
})
export class FormCheckboxComponent extends FormBaseComponent {
    _multiple: boolean = false
    _choices: Array<{id: any, value: any}> = []

    _isBoolean: boolean = true
    _type: string

    public ngOnInit() {
        super.ngOnInit()

        this._multiple = this._definition.isArray()
        this._isBoolean = this.isBoolean()
        this._type = this.getType()

        if (this._multiple)
            this._choices = this._definition.input.values
    }
    
    private getType() : string {
        return this._multiple ? 'checkbox' : 'radio'
    }

    private isBoolean() : boolean {
        return !this._multiple
    }
}