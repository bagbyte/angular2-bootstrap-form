import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormBaseComponent } from './form-base.component'

declare var $: any
declare var moment: any

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

        if (this._definition.isTime())
            this._value = moment(this._value, 'DD/MM/YYYY').format(moment.localeData().longDateFormat('LTS'))
        if (this._definition.isDate())
            this._value = moment(this._value, 'HH:mm:ss').format(moment.localeData().longDateFormat('L'))
    }

    private getType() : string {
        if (this._definition.input.isHidden())
            return 'hidden'
        return 'text'
        /*
        if (this._definition.isTime())
            return 'time'
        if (this._definition.isDate())
            return 'date'
        if (this._definition.isDateTime())
            return 'datetime'
        return 'text'
        */
    }

    ngAfterViewInit() {
        let component = this

        if (this._definition.isTime())
            $('#' + this._fieldIdentifier)
                .datetimepicker({format: moment.localeData().longDateFormat('LTS')})
                .on("dp.change", function(e) {
                    if (e.date != e.oldDate)
                        component._onValueChanged({target: {value: e.date.format('HH:mm:ss')}})
                })
        else if (this._definition.isDate())
            $('#' + this._fieldIdentifier)
                .datetimepicker({format: moment.localeData().longDateFormat('L')})
                .on("dp.change", function(e) {
                    if (e.date != e.oldDate)
                        component._onValueChanged({target: {value: e.date.format('DD/MM/YYYY')}})
                })
        else if (this._definition.isDateTime())
            $('#' + this._fieldIdentifier)
                .datetimepicker({format: moment().format()})
                .on("dp.change", function(e) {
                    if (e.date != e.oldDate)
                        component._onValueChanged({target: {value: e.date.format()}})
                })
    }
}