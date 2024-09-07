import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envorinments } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private readonly _httpClient=inject(HttpClient)
  Headers:any={token:localStorage.getItem('usertoken')};
addProudctToCart(id:string):Observable<any>
{
return this._httpClient.post(`${envorinments.baseUrl}/api/v1/cart`,
  {
    productId:id
  },
  {
    headers:this.Headers
  }
)
}
getProductCart():Observable<any>
{
  return this._httpClient.get(`${envorinments.baseUrl}/api/v1/cart`,
    {
headers:this.Headers
  })
}
DeleteSpeceficCartItem(id:string):Observable<any>
{
  return this._httpClient.delete(`${envorinments.baseUrl}/api/v1/cart/${id}`,
    {
      headers:this.Headers
    }
  )
}
UpdateCount(id:string,newCount:number):Observable<any>
{
  return this._httpClient.put(`${envorinments.baseUrl}/api/v1/cart/${id}`,
    {
      "count":newCount
    }
    ,
    {
      headers:this.Headers
    }
  )
}
ClearCart():Observable<any>
{
  return this._httpClient.delete(`${envorinments.baseUrl}/api/v1/cart`,
    {
      headers:this.Headers
    }
  )
}
}
