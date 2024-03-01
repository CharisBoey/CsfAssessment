import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Observable, Subscription, map } from 'rxjs';
import { LineItem } from '../models';

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

  getValues(price:number, quantity:number){
    console.log("!!!",price, quantity)
  }
    //console.log("@@@",this.AllCartItems$)
    /* this.AllCartItems$ = this.cartStore.getCart.subscribe({
      next: value => {console.log('Observable emitted the next value: ' + value)
                      return value},
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('Observable emitted the complete notification')
    }); */

    /* prodId: string
  quantity: number
  name: string
  price: number */

    /* this.sub$ = this.service.postForm(this.postForm, this.photo).subscribe({
      next: (result) => {alert('Your news has been posted successfully, with id: ' + result.newsId);
                         this.router.navigate(['/'])},
      error: (err) => {console.log(err)},
      complete: () => {this.sub$.unsubscribe()}
    }); */
  

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
    this.checkoutForm = this.createForm()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  

}
