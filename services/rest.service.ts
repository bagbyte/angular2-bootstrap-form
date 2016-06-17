import { Injectable } from '@angular/core'
import { Http, Response, Headers, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map
import { Observable } from 'rxjs/Observable'
import { Entity } from '../models/entity.model'

@Injectable()
export class RestService<T extends Entity> {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _baseUrl: string) {

        this.actionUrl = _baseUrl + T.resourcePath;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    public GetAll = (params): Observable<Response> => {
        return this._http.get(this.actionUrl, { search: this.getParams(params) }).map(res => res.json());
    };

    public GetSingle = (id: number): Observable<Response> => {
        return this._http.get(this.actionUrl + id).map(res => res.json());
    };

    public Add = (item: T): Observable<Response> => {
        return this._http.post(this.actionUrl, item.toJSON(), { headers: this.headers }).map(res => res.json());
    };

    public Update = (id: number, item: T): Observable<Response> => {
        return this._http.put(this.actionUrl + id, item.toJSON(), { headers: this.headers }).map(res => res.json());
    };

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id);
    };

    private getParams(map) : URLSearchParams {
        let params = new URLSearchParams();

        if (map) {
            for (var key in map) {
                params.set(key, map[key]);
            }
        }

        return params;
    }
}