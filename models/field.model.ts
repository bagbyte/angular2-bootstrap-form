import {FieldType} from "./enums.model";
import {InputDefinition} from "./input.model";

export class FieldError {
    private message: string

    hasError() : boolean { return (this.message != null) && this.message != '' }

    removeError() { this.message = null }

    setMessage(message: string) { this.message = message }

    getMessage() : string { return this.message }
}

export class FieldDefinition {
    type: FieldType
    initialValue: any
    required: boolean = false
    minLenght: number
    maxLength: number
    minValue: number
    maxValue: number
    error: FieldError = new FieldError()
    jsonKey: string
    showInList: boolean = true
    input: InputDefinition = new InputDefinition()

    hasError() : boolean { return this.error.hasError() }

    getError() : string { return this.error.getMessage() }

    static fromMap(map: Object) : FieldDefinition {
        var definition = new FieldDefinition();

        Object.keys(map).forEach(property => {
            definition[property] = map[property];
        });

        return definition;
    }

    static isValid(value: any, definition: FieldDefinition, throwException: boolean = false) : boolean {
        if (definition.type == FieldType.String)
            return this.isStringValid(value, definition, throwException)

        if (definition.type == FieldType.Number)
            return this.isNumberValid(value, definition, throwException)

        if (definition.type == FieldType.Boolean)
            return true

        // TODO: Add FieldType.Coordinates check

        if (throwException)
            throw new TypeError('Field type not recognized: ' + definition.type)
        else
            return false
    }

    private static isStringValid(value: string, definition: FieldDefinition, throwException: boolean = false) : boolean {
        if (!value) {
            if (throwException && definition.required)
                throw new Error('Required')
            else
                return !definition.required;
        }

        if (definition.minLenght && definition.maxLength) {
            let valid : boolean = (value.length >= definition.minLenght && value.length <= definition.maxLength)

            if (!valid && throwException)
                throw new RangeError('Length between ' + definition.minLenght + ' and ' + definition.maxLength)

            return valid
        }

        if (definition.minLenght) {
            let valid : boolean = (value.length >= definition.minLenght)

            if (!valid && throwException)
                throw new RangeError('Min length ' + definition.minLenght)

            return valid
        }

        if (definition.maxLength) {
            let valid : boolean = (value.length <= definition.maxLength)

            if (!valid && throwException)
                throw new RangeError('Max length ' + definition.maxLength)

            return valid
        }

        return true
    }

    private static isNumberValid(value: number, definition: FieldDefinition, throwException: boolean = false) : boolean {
        if (!value) {
            if (throwException && definition.required)
                throw new Error('Required')
            else
                return !definition.required;
        }

        if (definition.minValue && definition.maxValue) {
            let valid : boolean = (value >= definition.minValue && value <= definition.maxValue)

            if (!valid && throwException)
                throw new RangeError('Use number between ' + definition.minValue + ' and ' + definition.maxValue)

            return valid
        }

        if (definition.minValue) {
            let valid : boolean = (value >= definition.minValue)

            if (!valid && throwException)
                throw new RangeError('Use number > ' + definition.minValue)

            return valid
        }

        if (definition.maxValue) {
            let valid : boolean = (value <= definition.maxValue)

            if (!valid && throwException)
                throw new RangeError('Use number < ' + definition.maxValue)

            return valid
        }

        return true
    }
}