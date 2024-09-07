import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envorinments } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

private readonly _httpClient=inject(HttpClient);
private readonly _Router=inject(Router);

userData:any


setRegisterForm(data:object):Observable<any>
{
return this._httpClient.post(`${envorinments.baseUrl}/api/v1/auth/signup`,data)
}
setloginForm(data:object):Observable<any>
{
  return this._httpClient.post(`${envorinments.baseUrl}/api/v1/auth/signin`,data)
}
saveUserData():void{
if(localStorage.getItem('usertoken')!=null)
{
  this.userData=jwtDecode(localStorage.getItem('usertoken')!)
}
}
logOut():void{
localStorage.removeItem('usertoken');
this.userData=null;
this._Router.navigate(['\login'])
}

setEmailVerify(data:object):Observable<any>
{
return this._httpClient.post(`${envorinments.baseUrl}/api/v1/auth/forgotPasswords`,data)
}
setCodeVerify(data:object):Observable<any>
{
return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,data)}
resetPass(data:object):Observable<any>
{
return this._httpClient.put(`${envorinments.baseUrl}/api/v1/auth/resetPassword`,data)
}
}
