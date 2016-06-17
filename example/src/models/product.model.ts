import { Entity } from '../../../models/entity.model'
import { FieldDefinition } from '../../../models/field.model'
import { InputDefinition } from '../../../models/input.model'
import { FieldType, InputType } from '../../../models/enums.model'

export class Product extends Entity {
    resourcePath: string = 'products'

    properties: { [key:string]: FieldDefinition } = {
        'id': FieldDefinition.fromMap({
            type: FieldType.Number,
            required: false
        }),
        'code': FieldDefinition.fromMap({
            type: FieldType.String,
            required: true,
            minLenght: 3,
            maxLenght: 6,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Code'
            })
        }),
        'name': FieldDefinition.fromMap({
            type: FieldType.String,
            required: true,
            minLenght: 3,
            maxLenght: 100,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Name'
            })
        }),
        'price': FieldDefinition.fromMap({
            type: FieldType.Number,
            required: true,
            minValue: 0,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Name'
            })
        })
    }

    constructor() {
        super()

        this.setDefaults()
    }
}