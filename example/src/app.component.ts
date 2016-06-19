import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { HomeComponent } from './components/home.component'
import { AddressFormComponent } from './components/address-form.component'
import { ClientFormComponent } from './components/client-form.component'
import { InvoiceFormComponent } from './components/invoice-form.component'
import { ProductFormComponent } from './components/product-form.component'

@Component({
    selector: 'example',
    directives: [ROUTER_DIRECTIVES, HomeComponent, AddressFormComponent, ClientFormComponent, InvoiceFormComponent, ProductFormComponent],
    providers: [ROUTER_DIRECTIVES],
    template: `
        <h1>My First Angular 2 App - New</h1>
        <a [routerLink]="['/address']">Address</a>
        <a [routerLink]="['/client']">Client</a>
        <a [routerLink]="['/invoice']">Invoice</a>
        <a [routerLink]="['/product']">Product</a>
        <router-outlet></router-outlet>
    `
})
@Routes([
    { path: '/',        component: HomeComponent },
    { path: '/address', component: AddressFormComponent },
    { path: '/client',  component: ClientFormComponent  },
    { path: '/invoice', component: InvoiceFormComponent },
    { path: '/product', component: ProductFormComponent },
])
export class AppComponent {
    constructor(private _router: Router) {
        _router.navigate(['/'])
    }
}