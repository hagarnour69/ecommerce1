import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envorinments } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
private readonly _httpclient=inject(HttpClient)

getallcategories():Observable<any>
{
  return this._httpclient.get(`${envorinments.baseUrl}/api/v1/categories`)
}
getSubcategories(id:string):Observable<any>
{
  return this._httpclient.get(`${envorinments.baseUrl}/api/v1/categories/${id}/subcategories`)
}


}
