
// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { Cart, LineItem } from "./models";
import { ComponentStore } from "@ngrx/component-store";

const CART_STORE: Cart = {
    lineItems: []
}

@Injectable()
export class CartStore extends ComponentStore<Cart>{
    constructor() { super (CART_STORE) }

    readonly addLineItem = this.updater<LineItem>(
        (slice: Cart, item: LineItem) => {
          return {
            lineItems: [ ...slice.lineItems, item ]
          }
        }
    )

    readonly getCart = this.select<LineItem[]>(
        (slice: Cart) => slice.lineItems
    )

    readonly cartCount = this.select<number>(
        (slice: Cart) => slice.lineItems.length
    )

}
