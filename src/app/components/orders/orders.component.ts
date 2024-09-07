import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  cartId: string | null = " "

  private readonly _activeRouter = inject(ActivatedRoute)
  private readonly _OrderServise = inject(OrdersService)
  private readonly _toaster=inject(ToastrService)

  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })
  orderSubmit() {
    console.log(this.orders.value)
    this._OrderServise.checkout(this.cartId, this.orders.value).subscribe(
      {
        next: (res) => {
          console.log(res)
          if(res.status=="success")
          {
            this._toaster.info(res.status,'Fresh Cart')

            window.open(res.session.url)
          }
        }
      }
    )
  }

  ngOnInit(): void {
    this._activeRouter.paramMap.subscribe(
      {
        next: (params) => {
          this.cartId=params.get('id')
        }
      }
    )
  }
}
