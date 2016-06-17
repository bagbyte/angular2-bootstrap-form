import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Entity, FieldDefinition } from '../../models/entity.model'

@Component({
    selector: 'form-entity-collection',
    styles: ['h2, h4, th { text-transform:capitalize; }'],
    template: `
        <div class="entity">
            <div class="x_title">
                <h2>{{ _entityName }}</h2>
                <div class="clearfix"></div>
            </div>

            <table class="table table-hover">
                <thead>
                <tr>
                    <th *ngFor="let _property of _dumpEntity.propertyList()">{{_property}}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let _subEntity of _subEntities; let i = index">
                    <td *ngFor="let _property of _subEntity.propertyList()" *ngIf="_subEntity.isPropertyVisible(_property)">{{_subEntity.getPropertyValue(_property)}}</td>
                    <td style="text-align: right;">
                        <button type="button" class="btn btn-primary" data-toggle="modal" [attr.data-target]="'#' + _entityName + 'EditModal'" (click)="editEntity(i)"><i class="fa fa-pencil"></i> Edit</button>
                        <button type="button" class="btn btn-danger" data-toggle="modal" [attr.data-target]="'#' + _entityName + 'DeleteModal'" (click)="deleteEntity(i)"><i class="fa fa-times"></i> Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Edit Modal -->
        <div class="modal fade" [id]="_entityName + 'EditModal'" tabindex="-1" role="dialog" aria-labelledby="expenseModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{_entityName}}</h4>
                    </div>
                    <div class="modal-body">
        
                        <form id="expense-form" data-parsley-validate class="form-horizontal form-label-left">
                        
                            <form-field *ngFor="let _property of _dumpEntity.propertyList()" [entity]="_entity" [property]="_property" (onPropertyChanged)="onPropertyChanged($event)"></form-field>
        
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" (click)="entitySaveCancelled()">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="entitySaved()">Save</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Delete Modal -->
        <div class="modal fade" [id]="_entityName + 'DeleteModal'" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Delete {{_entityName}}</h4>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete it?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" (click)="undeleteEntity()">No</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="confirmDeleteEntity()">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FormEntityCollectionComponent {
    @Input() entity: Entity
    @Input() property: string

    @Output() onEntityPropertyChanged = new EventEmitter();
    @Output() onEntityAdded = new EventEmitter();
    @Output() onEntityRemoved = new EventEmitter();

    _subEntities: Array<Entity>
    _entityName: string
    _definition: FieldDefinition

    _dumpEntity: Entity
    _isEntityNew: boolean
    _subEntity: Entity
    _entityToDelete: number

    public ngOnInit() {
        this._subEntities = this.entity.getPropertyValue(this.property)

        this._definition = this.entity.getPropertyDescription(this.property)
        this._dumpEntity = window[this._definition.entityClass]

        this._entityName = this._dumpEntity.constructor.name.toLowerCase()
    }

    private editEntity(index: number) {
        this._isEntityNew = false
        this._subEntity = this._subEntities[index]
    }

    private deleteEntity(index: number) {
        this._entityToDelete = index
    }

    private undeleteEntity() {
        this._entityToDelete = null
    }

    private confirmDeleteEntity() {
        if (this._entityToDelete != null) {
            this.onEntityRemoved.next(this._subEntities[this._entityToDelete])

            this._subEntities.splice(this._entityToDelete, 1)

            this.undeleteEntity()
        }
    }

    private entitySaved() {
        if (this._subEntity.isValid()) {
            if (this._isEntityNew) {
                this._subEntities.push(this._subEntity)
                this.onEntityAdded.next(this._subEntity)
            }
        }
    }
    
    private entitySaveCancelled() {
        this._subEntity = null
    }

    private createExpense() {
        this._subEntity = window[this._definition.entityClass];
        this._isEntityNew = true;
    }

    private onPropertyChanged(value: {property: string, value: string}) {
        this.onEntityPropertyChanged.next({entity: this.property, property: value.property, value: value.value})
    }
}