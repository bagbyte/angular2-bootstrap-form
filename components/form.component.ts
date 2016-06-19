import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity } from '../models/entity.model'
import { FormFieldComponent } from './form-field.component'

@Component({
    selector: 'full-form',
    directives: [FormFieldComponent],
    template: `
        <form id="full-form" class="form-horizontal form-label-left">
            <form-field *ngFor="let property of entity.propertyList()" 
                [entity]="entity" 
                [property]="property" 
                (onPropertyChanged)="_onPropertyChanged($event)" 
                (onEntityPropertyChanged)="_onEntityPropertyChanged($event)" 
                (onEntityAdded)="_onEntityAdded($event)" 
                (onEntityRemoved)="_onEntityRemoved($event)">
            </form-field>
            
            <div class="ln_solid"></div>
            
            <div class="form-group">
                <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                    <button class="btn btn-success" (click)="_onFormSubmit($event)">Submit</button>
                </div>
            </div>
        </form>
    `
})
export class FormComponent {
    @Input() entity: Entity;

    @Output() onPropertyChanged = new EventEmitter();
    @Output() onEntityPropertyChanged = new EventEmitter();
    @Output() onEntityAdded = new EventEmitter();
    @Output() onEntityRemoved = new EventEmitter();
    @Output() onFormSubmit = new EventEmitter();

    private _onPropertyChanged(value) {
        this.onPropertyChanged.next(value);
    }

    private _onFormSubmit(event) {
        this.onFormSubmit.next(this.entity);
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