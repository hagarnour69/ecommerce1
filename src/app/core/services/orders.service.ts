import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envorinments } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  Headers: any = { token: localStorage.getItem('usertoken') };
  userData: any
  private readonly _httpclient = inject(HttpClient)


  saveUserData(): void {
    if (localStorage.getItem('usertoken') != null) {
      this.userData = jwtDecode(localStorage.getItem('usertoken')!)
    }
    return this.userData
  }


  checkout(id: string | null, shippingdetails: object): Observable<any> {
    return this._httpclient.post(`${envorinments.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,

      {
        "shippingAddress": shippingdetails

      },
      {
        headers: this.Headers
      }


    )
  }
  getOrders(id: string): Observable<any> {
    return this._httpclient.get(`${envorinments.baseUrl}/api/v1/orders/user/${id}`)
  }
}
