import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { subscribe } from 'diagnostics_channel';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  ProductUnsubscribe!: Subscription;
  categoryUnsubscribe!: Subscription;
  text: string = ' '
  private readonly _Proudct = inject(ProductService);
  private readonly _cart = inject(CartService);
  private readonly _toaster=inject(ToastrService)
  /*interfaces*/
  products: IProduct[] = [];

  ngOnInit(): void {
    /*product subscribe*/
    this.ProductUnsubscribe = this._Proudct.getProduct().subscribe(
      {
        next: (res) => {
          // console.log(res.data[0])
          this.products = res.data;
        },
        error: (err) => {
          // console.log(err)
        }
      }
    )


  }
  addCart(id: string): void {
    this._cart.addProudctToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this._toaster.success(res.message,'Fresh Cart')
      },
      error: (err) => {
        console.log(err)
        this._toaster.error(err.name,'Fresh Cart')

      }
    })
  }
  ngOnDestroy(): void {
    this.ProductUnsubscribe?.unsubscribe();
  }
}



