import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMsg: string = " ";
  isloading: boolean = false;
  RegisterUnsubscribe!:Subscription;
  private readonly _auth_service = inject(AuthServiceService)
  private readonly _loginNavigate = inject(Router)

  register: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z,A-Z]\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/01[0125][0-9]{8}$/)])
  }, this.confirmPassword)
  /*groub is register */
  confirmPassword(groub: AbstractControl) {
    if (groub.get('password')?.value == groub.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }





  registerSubmit(): void {
    this.isloading = true

    if (this.register.valid) {
     this.RegisterUnsubscribe= this._auth_service.setRegisterForm(this.register.value).subscribe(
        {
          next: (res) => {
            console.log(res)
            if (res.message === 'success') {
               this._loginNavigate.navigate(['/login'])
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
      this.register.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.RegisterUnsubscribe?.unsubscribe();
    
  }
}
