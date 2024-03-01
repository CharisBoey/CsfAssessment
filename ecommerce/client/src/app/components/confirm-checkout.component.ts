import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent {

  // TODO Task 3
  private fb = inject(FormBuilder)
  checkoutForm!: FormGroup

  ngOnInit(): void {
    this.checkoutForm = this.createForm()
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
    this.checkoutForm = this.createForm()
  }

}
