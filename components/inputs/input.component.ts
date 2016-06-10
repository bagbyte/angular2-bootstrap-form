import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Entity, FieldDefinition } from '../../models/entity.model'

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
export class FormInputComponent {
    @Input() entity: Entity
    @Input() property: string

    @Output() valueChanged = new EventEmitter();

    _definition: FieldDefinition
    _entityName: string
    _fieldIdentifier: string
    _className: string
    _iconClass: string
    _type: string
    _showIcon: boolean
    _value: string
    _placeholder: string
    _readonly: boolean;
    _required: boolean;
    _label: string;
    _errorMessage: string = ''

    public ngOnInit() {
        this._entityName = this.entity.constructor.name.toLowerCase()
        this._definition = this.entity.getPropertyDescription(this.property)

        this._fieldIdentifier = this._entityName + '-' + this.property
        this._className = this.getClassName()
        this._iconClass = this.getIconClass()
        this._showIcon = this.hasIcon()
        this._type = this.getType()
        this._placeholder = this._definition.input.placeholder ? this._definition.input.placeholder : ''
        this._readonly = this._definition.input.readOnly
        this._required = this._definition.required
        this._label = this._definition.input.label

        let value = this.entity.getPropertyValue(this.property)
        this._value = (value) ? value : ''
    }

    private getIconClass() : string {
        return this.hasIcon() ? 'fa form-control-feedback left ' + this._definition.input.icon : 'form-control-feedback left'
    }

    private hasIcon() : boolean {
        return (this._definition.input.icon != null && this._definition.input.icon != '')
    }

    private getClassName() : string {
        return this.hasIcon() ? 'form-control has-feedback-left' : 'form-control'
    }

    private onValueChanged(event) {
        this.entity.setPropertyValue(this.property, event.target.value);
        this.valueChanged.next(event.target.value);
    }

    private getType() : string {
        return this._definition.input.isHidden() ? 'hidden' : 'text'
    }

    private isValid() : boolean {
        let valid = this.entity.isPropertyValid(this.property)
        this._errorMessage = this._definition.getError()
        return valid
    }
}