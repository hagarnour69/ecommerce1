import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { envorinments } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _httpclient= inject(HttpClient)
  getAllBrands():Observable<any>
  {
    return this._httpclient.get(`${envorinments.baseUrl}/api/v1/brands`)
  }
  getSpecificBrand(id:string):Observable<any>
  {
    return this._httpclient.get(`${envorinments.baseUrl}/api/v1/brands/${id}`)
  }
}
