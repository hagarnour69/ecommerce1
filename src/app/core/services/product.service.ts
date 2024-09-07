import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envorinments } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _HttpClient=inject(HttpClient);

getProduct():Observable<any>
{
return this._HttpClient.get(`${envorinments.baseUrl}/api/v1/products`)
}
getSpecificProduct(id:string|null):Observable<any>
{
return this._HttpClient.get(`${envorinments.baseUrl}/api/v1/products/${id}`)
}}

