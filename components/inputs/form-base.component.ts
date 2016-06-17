import { Input, Output, EventEmitter } from '@angular/core'
import { Entity, FieldDefinition } from '../../models/entity.model'

export class FormBaseComponent {
    @Input() entity: Entity
    @Input() property: string

    @Output() onValueChanged = new EventEmitter();

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
    _values: Array<{id:string, value:string}> = [];

    public ngOnInit() {
        this._entityName = this.entity.constructor.name.toLowerCase()
        this._definition = this.entity.getPropertyDescription(this.property)

        this._fieldIdentifier = this._entityName + '-' + this.property
        this._className = this.getClassName()
        this._iconClass = this.getIconClass()
        this._showIcon = this.hasIcon()
        this._type = this.getType()
        this._placeholder = this._definition.input.placeholder
        this._readonly = this._definition.input.readOnly
        this._required = this._definition.required
        this._label = this._definition.input.label
        this._values = this._definition.input.values

        let value = this.entity.getPropertyValue(this.property)
        if (value)
            this._value = value
        else {
            if (this._values.length > 0) {
                this._value = this._values[0].id
                this.entity.setPropertyValue(this.property, this._value);
            }
            else
                this._value = ''
        }
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
        this.onValueChanged.next(event.target.value);
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