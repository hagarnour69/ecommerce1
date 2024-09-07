import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,OrdersComponent,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _cart = inject(CartService)
  cartProductUnsubscribe!: Subscription
  cartDetails: ICart = {} as ICart
  empty: boolean = false;

  ngOnInit(): void {
    if(!this.empty)
    {
      this.cartProductUnsubscribe = this._cart.getProductCart().subscribe(
        {
          next: (res) => {
            console.log(res.data)
            this.cartDetails = res.data
          }
          ,
          error: (err) => {
            console.log(err)
          }
        }
      )
    }
    else{
      this.empty=true
    }

  }
  deleteSpecificProduct(id: string) {
    this._cart.DeleteSpeceficCartItem(id).subscribe(
      {
        next: (res) => {
          console.log(res)
          this.cartDetails = res.data
        },
        error: (err) => {
          // console.log(err)
        }
      }
    )
  }
  updateCount(id: string, count: number) {
    if (count > 0) {
      this._cart.UpdateCount(id, count).subscribe(
        {
          next: (res) => {
            console.log(res)
            this.cartDetails = res.data
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    }
    else {
      this.deleteSpecificProduct(id)
    }
  }
  clearCart() {
    this._cart.ClearCart().subscribe(
      {
        next: (res) => {
          console.log(res)
          this.cartDetails = {} as ICart
          this.empty = true
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }


  ngOnDestroy(): void {

    this.cartProductUnsubscribe.unsubscribe
  }
}
