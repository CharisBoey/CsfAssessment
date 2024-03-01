import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {Observable, Subject, lastValueFrom, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  private readonly ngUnsubscribe = new Subject();

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)
  disabled: boolean=true
  // itemCountObservable!: Observable<number>
  itemCount: number=0

  ngOnInit(): void {
    console.log("In primary component")
    // this.itemCountObservable = this.cartStore.cartCount
    this.cartStore.cartCount.pipe(takeUntil(this.ngUnsubscribe)).subscribe(products => this.itemCount = products);
  }
  
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }

  
}


