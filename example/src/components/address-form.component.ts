import { Component } from '@angular/core';
import { Address } from '../models/address.model';
import { FormComponent } from '../../../components/form.component'

@Component({
    selector: 'address-form',
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
export class AddressFormComponent {
    entity = new Address()

    private onPropertyChanged(value) {
        console.log('onPropertyChanged called with object: ' + value)
    }

    private onFormSubmit(value) {
        console.log('onFormSubmit called with object: ' + value)
    }

    private onEntityPropertyChanged(value) {
        console.log('onEntityPropertyChanged called with object: ' + value)
    }

    private onEntityAdded(value) {
        console.log('onEntityAdded called with object: ' + value)
    }

    private onEntityRemoved(value) {
        console.log('onEntityRemoved called with object: ' + value)
    }
}