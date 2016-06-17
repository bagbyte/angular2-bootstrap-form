import { Entity } from '../../../models/entity.model'
import { FieldDefinition } from '../../../models/field.model'
import { InputDefinition } from '../../../models/input.model'
import { FieldType, InputType } from '../../../models/enums.model'

export class Address extends Entity {
    resourcePath: string = 'address'

    properties: { [key:string]: FieldDefinition } = {
        'id': FieldDefinition.fromMap({
            type: FieldType.Number,
            required: false
        }),
        'header': FieldDefinition.fromMap({
            type: FieldType.String,
            required: false,
            minLenght: 3,
            maxLenght: 100,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Header'
            })
        }),
        'street': FieldDefinition.fromMap({
            type: FieldType.String,
            required: false,
            minLenght: 5,
            maxLenght: 100,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Street'
            })
        }),
        'houseNumber': FieldDefinition.fromMap({
            type: FieldType.String,
            required: false,
            minLenght: 1,
            maxLenght: 8,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'House Number'
            })
        }),
        'postalCode': FieldDefinition.fromMap({
            type: FieldType.String,
            required: false,
            minLenght: 3,
            maxLenght: 8,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Postal Code'
            })
        }),
        'city': FieldDefinition.fromMap({
            type: FieldType.String,
            required: true,
            minLenght: 2,
            maxLenght: 20,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'City'
            })
        }),
        'country': FieldDefinition.fromMap({
            type: FieldType.String,
            required: true,
            minLenght: 2,
            maxLenght: 2,
            input: InputDefinition.fromMap({
                type: InputType.Select,
                label: 'Country',
                values: this.getCountryList()
            })
        }),
        'note': FieldDefinition.fromMap({
            type: FieldType.String,
            required: false,
            minLenght: 5,
            maxLenght: 255,
            input: InputDefinition.fromMap({
                type: InputType.Textarea,
                label: 'Note'
            })
        }),
        'position': FieldDefinition.fromMap({
            type: FieldType.Coordinates,
            required: false,
            input: InputDefinition.fromMap({
                type: InputType.Map,
                label: 'Note'
            })
        })
    }

    constructor() {
        super()

        this.setDefaults()
    }

    private getCountryList() : Array<{id:string, value:any}> {
        return [
            {id: 'IT', value: 'Italy'}
        ]
    }
}