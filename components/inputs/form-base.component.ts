import { Input, Output, EventEmitter } from '@angular/core'
import { Entity } from '../../models/entity.model'
import { FieldDefinition } from '../../models/field.model'

export class FormBaseComponent {
    @Input() entity: Entity
    @Input() property: string

    @Output() onValueChanged = new EventEmitter();

    _definition: FieldDefinition
    _entityName: string
    _fieldIdentifier: string
    _className: string
    _iconClass: string
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
        this._placeholder = this._definition.input.placeholder
        this._readonly = this._definition.input.readOnly
        this._required = this._definition.required
        this._label = this._definition.input.label

        let value = this.entity.getPropertyValue(this.property)
        this._value = (value) ? value : ''
    }

    protected getIconClass() : string {
        return this.hasIcon() ? 'fa form-control-feedback left ' + this._definition.input.icon : 'form-control-feedback left'
    }

    protected hasIcon() : boolean {
        return (this._definition.input.icon != null && this._definition.input.icon != '')
    }

    protected getClassName() : string {
        return this.hasIcon() ? 'form-control has-feedback-left' : 'form-control'
    }

    protected _onValueChanged(event) {
        this.entity.setPropertyValue(this.property, event.target.value);
        this.onValueChanged.next(event.target.value);
    }

    protected isValid() : boolean {
        let valid = this.entity.isPropertyValid(this.property)
        this._errorMessage = this._definition.getError()
        return valid
    }
}