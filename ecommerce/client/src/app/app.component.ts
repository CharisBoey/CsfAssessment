import { Component, OnInit, inject } from '@angular/core';
import {Observable, map} from 'rxjs';
import {Router} from '@angular/router';
import { LineItem } from './models';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)


  itemCount!: Observable<number>

  ngOnInit(): void {
    this.itemCount = this.cartStore.cartCount
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
