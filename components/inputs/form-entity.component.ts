import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity } from '../../models/entity.model'
import { FieldType } from '../../models/enums.model'

@Component({
    selector: 'form-entity',
    styles: ['h2 { text-transform:capitalize; }'],
    template: `
        <div class="entity">
            <div class="x_title">
                <h2>{{ _entityName }}</h2>
                <div class="clearfix"></div>
            </div>
            <form-field *ngFor="let _property of _subEntity.propertyList()" [entity]="_subEntity" [property]="_property" (onPropertyChanged)="_onPropertyChanged($event)"></form-field>
            <div class="ln_solid"></div>
        </div>
    `
})
export class FormEntityComponent {
    @Input() entity: Entity
    @Input() property: string

    @Output() onEntityPropertyChanged = new EventEmitter();

    _subEntity: Entity
    _entityName: string

    public ngOnInit() {
        this._subEntity = this.entity.getPropertyValue(this.property)
        this._entityName = this._subEntity.constructor.name.toLowerCase()
    }

    private _onPropertyChanged(value: {property: string, value: string, type: FieldType}) {
        this.onEntityPropertyChanged.next({entity: this.property, property: value.property, value: value.value, type: value.type});
    }
}