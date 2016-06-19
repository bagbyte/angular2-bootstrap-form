import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router'

bootstrap(AppComponent, [ROUTER_PROVIDERS, ROUTER_DIRECTIVES]);