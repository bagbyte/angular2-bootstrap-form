import { Component } from '@angular/core'
import { FormBaseComponent } from './form-base.component'
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
    selector: 'form-map',
    directives: [GOOGLE_MAPS_DIRECTIVES],
    template: `
        <p>Map Test</p>
    `
})
export class FormMapComponent extends FormBaseComponent {
}