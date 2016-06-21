import {FieldDefinition} from "./field.model";
import {FieldType} from "./enums.model";

declare var moment:any

export interface IEntity {
    id: number

    isNew() : boolean
    toJSON() : string
    isValid() : boolean
    isPropertyValid(property: string) : boolean
}

export class Entity implements IEntity {
    id: any // can be String or Number

    static resourcePath: string

    properties: { [key:string]:FieldDefinition; } = {}

    setDefaults() {
        if (!this.properties)
            return

        Object.keys(this.properties).forEach(property => {
            var description: FieldDefinition = this.getPropertyDescription(property)
            if (description.type == FieldType.Date || description.type == FieldType.Time || description.type == FieldType.DateTime) {
                let date: Date = new Date()
                if (description.initialValue) {
                    if (description.initialValue instanceof String) {
                        this.setPropertyValue(property, description.initialValue)
                        return
                    }
                    if (description.initialValue instanceof Date)
                        date = description.initialValue
                }

                if (description.type == FieldType.Date)
                    this.setPropertyValue(property, moment(date).format('DD/MM/YYYY'))
                else if (description.type == FieldType.Time)
                    this.setPropertyValue(property, moment(date).format('HH:mm:ss'))
                else if (description.type == FieldType.DateTime)
                    this.setPropertyValue(property, moment(date).format())
            }
            else if (description.type == FieldType.Entity) {
                if (!description.initialValue)
                    throw Error('Missing initialValue for property ' + property)

                this.setPropertyValue(property, description.initialValue)
            }
            else if (description.type == FieldType.EntityCollection) {
                if (!description.initialValue)
                    throw Error('Missing initialValue for property ' + property)

                let entities: Entity[] = []
                this.setPropertyValue(property, entities)
            }
            else if (description.initialValue)
                this.setPropertyValue(property, description.initialValue)
            else
                this.setPropertyValue(property, null)
        });
    }

    propertyExists(property: string) : boolean {
        return this.hasOwnProperty(property) || (property in this)
    }

    propertyDescribed(property: string) : boolean {
        return (property in this.properties)
    }

    getPropertyValue(property: string) : any {
        return this[property]
    }

    setPropertyValue(property: string, value: any) {
        this[property] = value
    }
    
    isPropertyVisible(property: string) : boolean {
        return this.getPropertyDescription(property).visible
    }

    getPropertyDescription(property: string) : FieldDefinition {
        return this.properties[property]
    }

    static fromMap(map) : Entity {
        let name : string = this.toString();
        let classname = name.substring(name.indexOf(' ')+1, name.indexOf('()'))

        var obj = window[classname];

        if (map.id)
            obj.id = map.id

        Object.keys(map).forEach(property => {
            obj[property] = map[property];
        });

        return obj;
    }

    isNew() : boolean { return this.id && this.id != null }

    isPropertyValid(property: string) : boolean {
        if (this.propertyExists(property) && this.propertyDescribed(property))
            try {
                if (FieldDefinition.isValid(this.getPropertyValue(property), this.getPropertyDescription(property), true)) {
                    this.getPropertyDescription(property).error.removeError()
                    return true
                }
            } catch (e) {
                this.getPropertyDescription(property).error.setMessage(e.message)
                return false
            }

        return false;
    }

    isValid() : boolean {
        var valid: boolean = false;

        Object.keys(this.properties).forEach(property => {
            valid = valid && this.isPropertyValid(property);
        });

        return valid;
    }

    toJSON() : string {
        var json : {} = {}

        Object.keys(this.properties).forEach(property => {

            if (this.propertyExists(property)) {
                var description: FieldDefinition = this.getPropertyDescription(property)
                var key: string = description.jsonKey ? description.jsonKey : property
                var value: any = this.getPropertyValue(property)

                // If string and has empty value, threath like a null
                if (description.type == FieldType.String) {
                    if (value && value == '')
                        value = null
                }

                if (value)
                    json[key] = value
                else {
                    if (description.required)
                        console.log('Field ' + property + ' is null but is required. Something went wrong in the validation or in the configuration?')
                }
            }

        });

        return JSON.stringify(json);
    }

    propertyList() : string[] {
        return Object.keys(this.properties)
    }

    static getCLassName() : string {
        let name : string = this.toString();
        return name.substring(name.indexOf(' ')+1, name.indexOf('()'))
    }
}