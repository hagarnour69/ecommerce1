import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  Pdetails:IProduct|null =null 
  productdetailsUnsub!:Subscription;
  detailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed:1500,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  private readonly _activeRoute = inject(ActivatedRoute)
  private readonly _productService = inject(ProductService)
  private readonly _cart = inject(CartService)
  private readonly _toaster=inject(ToastrService)

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(
      {
        next: (params) => {
         let productId= params.get('id')
         this.productdetailsUnsub=this._productService.getSpecificProduct(productId).subscribe(
          {
            next:(res)=>
            {
              console.log(res.data)
              this.Pdetails=res.data;
            },
            error:(err)=>
            {
              console.log(err);
              
            }
          }
        )
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
   } })
  }
  ngOnDestroy(): void {
   this.productdetailsUnsub?.unsubscribe();
    
  }
 
}
