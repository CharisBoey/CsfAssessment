import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Observable, Subscription, map } from 'rxjs';
import { Cart, LineItem, Order } from '../models';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy{
  

  // TODO Task 3
  private fb = inject(FormBuilder)
  checkoutForm!: FormGroup
  private cartStore = inject(CartStore)
  //AllCartItems$!: Observable<LineItem[]>
  TotalPrice:number=0
  sub!: Subscription
  lineItemArray: LineItem[]=[]
  private prodSvc = inject(ProductService)
  private router = inject(Router)

  //lineItemTemp: LineItem[]=[]

  LINEITEM: LineItem = {
    prodId: '',
    quantity: 0,
    name: '',
    price: 0,
  }



  ngOnInit(): void {
    this.checkoutForm = this.createForm();
    //this.AllCartItems$ = this.cartStore.getCart
    this.sub = this.cartStore.getCart.subscribe(
      items => this.lineItemArray = items)

    for (let i = 0; i < this.lineItemArray.length; i++) {
        console.log("IN ARRAY...", this.lineItemArray[i]); 
        this.TotalPrice += (this.lineItemArray[i].price * this.lineItemArray[i].quantity)
    }
    
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('',Validators.required),
      address: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>(''),
    })
  }
  processCheckout(){
    console.log(">>>FORM DETAILS: ", this.checkoutForm.value)
    const CART: Cart = {
      lineItems: []
    }
    console.log("???", this.lineItemArray)
    CART.lineItems = this.lineItemArray;

    const orderCheckout: Order = this.checkoutForm.value
    orderCheckout.cart = CART
    console.log("AFTER PROCESSING>>>", orderCheckout)
    this.prodSvc.checkout(orderCheckout).then(resp => {
      console.info('>>> resp: ', resp)
      alert(JSON.stringify(resp))
      this.router.navigate(['/'])
  
    })
    .catch(err => alert(JSON.stringify(err)))

    this.checkoutForm = this.createForm()

    //CHECK THAT RECEIVED
    /* this.prodSvc.checkout(orderCheckout).then(resp => {
      console.info('>>> resp: ', resp)
    })
    .catch(err => alert(JSON.stringify(err))) */
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  

}
