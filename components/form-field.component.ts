import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity, FieldDefinition } from '../models/entity.model'
import { FormInputComponent } from './inputs/form-input.component'
import { FormCheckboxComponent } from './inputs/form-checkbox.component'
import { FormSelectComponent } from './inputs/form-select.component'
import { FormTextareaComponent } from './inputs/form-textarea.component'
import { FormEntityComponent } from './inputs/form-entity.component'
import { FormEntityCollectionComponent } from './inputs/form-entity-collection.component'

@Component({
    selector: 'form-field',
    directives: [FormInputComponent, FormCheckboxComponent, FormSelectComponent, FormTextareaComponent, FormEntityComponent, FormEntityCollectionComponent],
    template: `
        <form-textarea *ngIf="isTextarea()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-textarea>
        <form-input *ngIf="isInput()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-input>
        <form-select *ngIf="isSelect()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-select>
        <form-checkbox *ngIf="isCheckbox()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-checkbox>
        <form-entity *ngIf="isEntity()" [entity]="entity" [property]="property" (onEntityPropertyChanged)="onEntityPropertyChanged($event)"></form-entity>
        <form-entity-collection *ngIf="isEntityCollection()" [entity]="entity" [property]="property" (onEntityPropertyChanged)="onEntityPropertyChanged($event)" (onEntityAdded)="onEntityAdded($event)" (onEntityRemoved)="onEntityRemoved($event)"></form-entity-collection>
    `
})
export class FormFieldComponent {
    @Input() entity: Entity;
    @Input() property: string;

    @Output() onPropertyChanged = new EventEmitter();
    @Output() onEntityPropertyChanged = new EventEmitter();
    @Output() onEntityAdded = new EventEmitter();
    @Output() onEntityRemoved = new EventEmitter();

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

    private isEntity() : boolean {
        return this._field.input.isEntity()
    }

    private isEntityCollection() : boolean {
        return this._field.input.isEntity()
    }

    private onValueChanged(value) {
        this.onPropertyChanged.next({property: this.property, value: value});
    }

    private onEntityPropertyChanged(value) {
        this.onEntityPropertyChanged.next(value);
    }

    private onEntityAdded(value) {
        this.onEntityAdded.next(value);
    }

    private onEntityRemoved(value) {
        this.onEntityRemoved.next(value);
    }
}