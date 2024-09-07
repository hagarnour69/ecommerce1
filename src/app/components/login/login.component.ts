import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMsg: string = " ";
  isloading: boolean = false;
  private readonly _auth_service = inject(AuthServiceService)
  private readonly _loginNavigate = inject(Router)

  login: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z,A-Z]\w{6,}$/)])
    
  })
  

  loginSubmit(): void {
    this.isloading = true

    if (this.login.valid) {
      this._auth_service.setloginForm(this.login.value).subscribe(
        {
          next: (res) => {
            console.log(res)
            if (res.message === 'success') {
               setTimeout(() => {
                //*save data user in local storage*//
                localStorage.setItem('usertoken',res.token)
                //*decode user token*//
                this._auth_service.saveUserData();
                //*navigate to home*//
                this._loginNavigate.navigate(['/home'])

               }, 1000);
            }
            this.isloading = false

          },
          error: (err: HttpErrorResponse) => {

            this.errorMsg = err.error.message;
            console.log(err.error.message)
            this.isloading = false


          }
        }
      )
    }
    else {
      this.login.markAllAsTouched()
    }
  }
}