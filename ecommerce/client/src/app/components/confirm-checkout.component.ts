import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Observable, Subscription, map } from 'rxjs';
import { Cart, LineItem, Order } from '../models';
import { ProductService } from '../product.service';

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


  ngOnInit(): void {
    this.checkoutForm = this.createForm();
    //this.AllCartItems$ = this.cartStore.getCart
    this.sub = this.cartStore.getCart.subscribe(
      items => this.lineItemArray = items)

    for (let i = 0; i < this.lineItemArray.length; i++) {
        console.log(this.lineItemArray[i]); 
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
    const LINEITEM: LineItem = {
      prodId: '',
      quantity: 0,
      name: '',
      price: 0,
    }

    const CART: Cart = {
      lineItems: []
    }
    
    for (let i = 0; i < this.lineItemArray.length; i++) {
      LINEITEM.prodId = this.lineItemArray[i].prodId
      LINEITEM.name = this.lineItemArray[i].name
      LINEITEM.quantity = this.lineItemArray[i].quantity
      LINEITEM.price = this.lineItemArray[i].price

      CART.lineItems.push(LINEITEM)
    }
    const orderCheckout: Order = this.checkoutForm.value
    orderCheckout.cart = CART
    console.log("AFTER PROCESSING>>>", orderCheckout)
    this.prodSvc.checkout(orderCheckout)
    this.checkoutForm = this.createForm()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  

}
