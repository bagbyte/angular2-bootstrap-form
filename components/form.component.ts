import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity, FieldDefinition } from '../models/entity.model'
import { FormFieldComponent } from './form-field.component'

@Component({
    selector: 'full-form',
    directives: [FormFieldComponent],
    template: `
        <form id="report-form" data-parsley-validate class="form-horizontal form-label-left">
        </form>
        <form-textarea *ngIf="isTextarea()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged(value)"></form-textarea>
        <form-input *ngIf="isInput()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged(value)"></form-input>
        <form-select *ngIf="isSelect()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged(value)"></form-select>
        <form-checkbox *ngIf="isCheckbox()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged(value)"></form-checkbox>
    `
})
export class FormComponent {
    @Input() entity: Entity;

    @Output() onValueChanged = new EventEmitter();
    @Output() onFormSubmit = new EventEmitter();
    @Output() onFormSubmitted = new EventEmitter();

    private onValueChanged(value) {
        this.onValueChanged.next(value);
    }

    private onFormSubmit(value) {
        this.onFormSubmit.next(value);
    }

    private onFormSubmitted(value) {
        this.onFormSubmitted.next(value);
    }
}