import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity, FieldDefinition } from '../../models/entity.model'
import { FormInputComponent } from './form-input.component'
import { FormCheckboxComponent } from './form-checkbox.component'
import { FormSelectComponent } from './form-select.component'
import { FormTextareaComponent } from './form-textarea.component'

@Component({
    selector: 'form-field',
    directives: [FormInputComponent, FormCheckboxComponent, FormSelectComponent, FormTextareaComponent],
    template: `
        <form-textarea *ngIf="isTextarea()" [entity]="entity" [property]="property" (valueChanged)="onValueChanged(value)"></form-textarea>
        <form-input *ngIf="isInput()" [entity]="entity" [property]="property" (valueChanged)="onValueChanged(value)"></form-input>
        <form-select *ngIf="isSelect()" [entity]="entity" [property]="property" (valueChanged)="onValueChanged(value)"></form-select>
        <form-checkbox *ngIf="isCheckbox()" [entity]="entity" [property]="property" (valueChanged)="onValueChanged(value)"></form-checkbox>
    `
})
export class FormFieldComponent {
    @Input() entity: Entity;
    @Input() property: string;

    @Output() valueChanged = new EventEmitter();

    _field: FieldDefinition = new FieldDefinition()

    public ngOnInit() {
        this._field = this.entity.getPropertyDescription(this.property)
    }

    private isInput() : boolean {
        return this._field.input.isHidden() || this._field.input.isText()
    }

    private isTextarea() : boolean {
        return this._field.input.isTextarea()
    }

    private isSelect() : boolean {
        return this._field.input.isSelect()
    }

    private isCheckbox() : boolean {
        return this._field.input.isCheckbox()
    }

    private onValueChanged(value) {
        this.valueChanged.next(value);
    }
}