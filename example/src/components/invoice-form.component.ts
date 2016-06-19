import { Component } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { FormComponent } from '../../../components/form.component'

@Component({
    selector: 'invoice-form',
    directives: [FormComponent],
    template: `
        <full-form [entity]="entity"
            (onPropertyChanged)="onPropertyChanged($event)" 
            (onEntityPropertyChanged)="onEntityPropertyChanged($event)" 
            (onEntityAdded)="onEntityAdded($event)" 
            (onEntityRemoved)="onEntityRemoved($event)"
            (onFormSubmit)="onFormSubmit($event)">
        </full-form>
    `
})
export class InvoiceFormComponent {
    entity = new Invoice()

    private onPropertyChanged(value) {
        console.log('onPropertyChanged called with object:')
        console.log(value)
    }

    private onFormSubmit(value) {
        console.log('onFormSubmit called with object:')
        console.log(value)
    }

    private onEntityPropertyChanged(value) {
        console.log('onEntityPropertyChanged called with object:')
        console.log(value)
    }

    private onEntityAdded(value) {
        console.log('onEntityAdded called with object:')
        console.log(value)
    }

    private onEntityRemoved(value) {
        console.log('onEntityRemoved called with object:')
        console.log(value)
    }
}