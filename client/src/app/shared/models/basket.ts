import * as cuid from 'cuid';

export interface Basket {
    id: string
    items: BasketItem[]
    clientSecret?: string
    paymentIntentId?: string
    deliveryMethodId?: number
    shippingPrice: number
  }
  
  export interface BasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
  }

  export interface BasketTotals {
    shipping: number
    subtotal: number
    total: number
  }

export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
    shippingPrice = 0;
}