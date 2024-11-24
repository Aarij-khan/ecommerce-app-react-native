import React,{ createContext, useState} from "react";

export const CartItem = createContext();

export default function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);

  const handleCartItems = (items) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item)=>item.id == items.id)
    if (itemIndex == -1) arr.push({...items,quantity:1});
    else arr[itemIndex].quantity++;
    setCarts([...arr]);
        
  }
  const removeCartItems = (id) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item)=>item.id == id)
    arr.splice(itemIndex,1)
    setCarts([...arr])
  }
  const IsItemAdded = (id) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item)=>item.id == id)
    if (itemIndex == -1) return null;
    else return arr[itemIndex].quantity;
  }
  const decreaseItem = (id) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item)=>item.id == id);
    arr[itemIndex].quantity--;
    setCarts([...arr])

  }


  return (
    <CartItem.Provider value={{ setCarts,carts,handleCartItems,removeCartItems,IsItemAdded,decreaseItem}}>{children}</CartItem.Provider>
  );
}
