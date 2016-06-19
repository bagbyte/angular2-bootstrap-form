import { Entity } from '../../../models/entity.model'
import { FieldDefinition } from '../../../models/field.model'
import { InputDefinition } from '../../../models/input.model'
import { FieldType, InputType } from '../../../models/enums.model'
import { Client } from './client.model'
import { Product } from './product.model'

export class Invoice extends Entity {
    static resourcePath: string = 'invoices'

    properties: { [key:string]: FieldDefinition } = {
        'id': FieldDefinition.fromMap({
            type: FieldType.Number,
            required: false
        }),
        'date': FieldDefinition.fromMap({
            type: FieldType.Date,
            initialValue: new Date(),
            required: false,
            input: InputDefinition.fromMap({
                type: InputType.Text, // TODO: change name
                label: 'Date'
            })
        }),
        'client': FieldDefinition.fromMap({
            type: FieldType.Entity,
            initialValue: new Client(),
            entityClass: Client.getCLassName(),
            required: true,
            input: InputDefinition.fromMap({
                type: InputType.Select,
                label: 'Client'
            })
        }),
        'products': FieldDefinition.fromMap({
            type: FieldType.EntityCollection,
            initialValue: new Product(),
            entityClass: Product.getCLassName(),
            required: false,
            input: InputDefinition.fromMap({
                type: InputType.EntityCollection,
                label: 'Products'
            })
        })
    }

    total() : number {
        var total = 0

        if (this.hasOwnProperty('products')) {
            this['products'].forEach(function(product: Product) {
                if (product.hasOwnProperty('price') && product['price'] > 0)
                    total += product['price']
            })
        }

        return total
    }

    constructor() {
        super()

        this.setDefaults()
    }
}