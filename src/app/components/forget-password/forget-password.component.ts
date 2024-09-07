import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step: number = 1;
  private readonly _authService = inject(AuthServiceService)
  private readonly _route = inject(Router)
  isloading: boolean = false;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,}$/)])
  })
  ResetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[a-z,A-Z]\w{6,}$/)])

  })

  submitmail(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.ResetPassword.get('email')?.patchValue(emailValue);

    this.isloading = true
    if (this.verifyEmail.valid) {
      this._authService.setEmailVerify(this.verifyEmail.value).subscribe(
        {
          next: (res) => {
            console.log(res)
            if (res.statusMsg == "success") {
              this.step = 2
              this.isloading = false

            }
          },
          error: (err) => {
            console.log(err)
          }
        })

    }
  }

  submitcode(): void {
    this.isloading = true
    console.log(this.verifyCode)

    if (this.verifyCode.valid) {
      this._authService.setCodeVerify(this.verifyCode.value).subscribe(
        {

          next: (res) => {
            console.log(res)
            if (res.status == "Success") {
              this.step = 3
              this.isloading = false

            }

          },
          error: (err) => {
            console.log(err)
            this.step = 1

          }
        })

    }
  }

  ResetPasswordSubmit(): void {
    this.isloading = true

    if (this.ResetPassword.valid) {
      this._authService.resetPass(this.ResetPassword.value).subscribe(
        {
          next: (res) => {
            console.log(res)
            setTimeout(() => {
              this.isloading = false

              //*save data user in local storage*//
              localStorage.setItem('usertoken', res.token)
              //*decode user token*//
              this._authService.saveUserData();
              //*navigate to home*//
              this._route.navigate(['/home'])

            }, 1000);
          },
          error: (err) => {
            console.log(err)
          }
        })

    }

  }
}