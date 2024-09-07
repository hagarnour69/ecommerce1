import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { IOrder } from '../../core/interfaces/iorder';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit  {
  orders:IOrder[]=[]
  userdata:any
  private readonly _allorders = inject(OrdersService)
ngOnInit(): void {
  this.userdata=this._allorders.saveUserData()
  // console.log(this.userdata.id)
  this._allorders.getOrders(this.userdata.id).subscribe
  ({
    next:(res)=>
    {
// console.log(res)
this.orders=res
console.log(this.orders)

    }
  })
}
  
}
