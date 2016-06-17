import { Entity } from '../../../models/entity.model'
import { FieldDefinition } from '../../../models/field.model'
import { InputDefinition } from '../../../models/input.model'
import { FieldType, InputType } from '../../../models/enums.model'
import { Address } from './address.model'

export class Client extends Entity {
    resourcePath: string = 'clients'

    properties: { [key:string]: FieldDefinition } = {
        'id': FieldDefinition.fromMap({
            type: FieldType.Number,
            required: false
        }),
        'firstName': FieldDefinition.fromMap({
            type: FieldType.String,
            required: true,
            minLenght: 3,
            maxLenght: 100,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'First Name'
            })
        }),
        'lastName': FieldDefinition.fromMap({
            type: FieldType.String,
            required: true,
            minLenght: 3,
            maxLenght: 100,
            input: InputDefinition.fromMap({
                type: InputType.Text,
                label: 'Last Name'
            })
        }),
        'address': FieldDefinition.fromMap({
            type: FieldType.Entity,
            entityClass: Address,
            required: false,
            input: InputDefinition.fromMap({
                type: InputType.Entity,
                label: 'Address'
            })
        })
    }

    constructor() {
        super()

        this.setDefaults()
    }
}