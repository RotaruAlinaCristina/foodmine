import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //every time when we refresh the page the card will be removed and will be empty
  //the solucion for keeping the data inside the browser is using the LocalStorage
  //for that I want to create 2 methods for setting cart for the localStorage and the other for getting card => at the last of page are this methods
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food:Food):void{
    let cartItem = this.cart.items
    .find(item => item.food.id === food.id);
  if (cartItem)
    return;

  this.cart.items.push(new CartItem(food));
  this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void{
    this.cart.items = this.cart.items
    .filter(item => item.food.id != foodId);
  this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items
    .find(item => item.food.id === foodId);
  if (!cartItem) return;

  cartItem.quantity = quantity;
  cartItem.price = quantity * cartItem.food.price;
  this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage():void{
    //if have 2 item this method (prevSum, currentItem) => prevSum +currentItem.price, 0)) have be called 2 time
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    //1.First Step is convert the card in the Json
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
