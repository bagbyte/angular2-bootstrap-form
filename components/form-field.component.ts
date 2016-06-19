import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity } from '../models/entity.model'
import { FieldDefinition } from '../models/field.model'
import { FormInputComponent } from './inputs/form-input.component'
import { FormCheckboxComponent } from './inputs/form-checkbox.component'
import { FormSelectComponent } from './inputs/form-select.component'
import { FormTextareaComponent } from './inputs/form-textarea.component'
import { FormStaticComponent } from './inputs/form-static.component'
import { FormEntityComponent } from './inputs/form-entity.component'
import { FormMapComponent } from './inputs/form-map.component'
import { FormEntityCollectionComponent } from './inputs/form-entity-collection.component'

@Component({
    selector: 'form-field',
    directives: [FormInputComponent, FormCheckboxComponent, FormSelectComponent, FormTextareaComponent, FormStaticComponent, FormMapComponent, FormEntityComponent, FormEntityCollectionComponent],
    template: `
        <form-textarea *ngIf="isTextarea()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-textarea>
        <form-input *ngIf="isInput()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-input>
        <form-select *ngIf="isSelect()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-select>
        <form-checkbox *ngIf="isCheckbox()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-checkbox>
        <form-map *ngIf="isMap()" [entity]="entity" [property]="property" (onValueChanged)="onValueChanged($event)"></form-map>
        <form-static *ngIf="isStatic()" [entity]="entity" [property]="property"></form-static>
        <form-entity *ngIf="isEntity()" [entity]="entity" [property]="property" (onEntityPropertyChanged)="_onEntityPropertyChanged($event)"></form-entity>
        <form-entity-collection *ngIf="isEntityCollection()" [entity]="entity" [property]="property" (onEntityPropertyChanged)="_onEntityPropertyChanged($event)" (onEntityAdded)="_onEntityAdded($event)" (onEntityRemoved)="_onEntityRemoved($event)"></form-entity-collection>
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

        if (this.property == 'header')
            console.log(this.entity)
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

    private isMap() : boolean {
        return this._field.input.isMap()
    }

    private isEntity() : boolean {
        return this._field.input.isEntity()
    }

    private isEntityCollection() : boolean {
        return this._field.input.isEntityCollection()
    }

    private isStatic() : boolean {
        return this._field.input.isStatic()
    }

    private onValueChanged(value) {
        this.onPropertyChanged.next({property: this.property, type: this._field.type, value: value});
    }

    private _onEntityPropertyChanged(value) {
        this.onEntityPropertyChanged.next(value);
    }

    private _onEntityAdded(value) {
        this.onEntityAdded.next(value);
    }

    private _onEntityRemoved(value) {
        this.onEntityRemoved.next(value);
    }
}