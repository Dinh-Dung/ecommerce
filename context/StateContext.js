import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";



const Context = createContext();


export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(); 
  const [totalQuantities, settotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);




  
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => {
      item._id === product._id; 
    });
    setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * quantity);
    settotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity);

    if(checkProductInCart){
      const updateCartItems = cartItems.map((cartProduct)=>{
        if(cartProduct._id === product._id)
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setcartItems(updateCartItems);
    } else{
      product.quantity = quantity;
      setcartItems([...cartItems, {...product}]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };




    const inQty = () => {
      setQty((prevQty) => prevQty + 1);
    };


    const decQty = () => {
      setQty((prevQty) => {
        if (prevQty - 1 < 1) return 1;
        return prevQty - 1;
      });
    };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        setshowCart,
        qty,
        inQty,
        decQty,
        onAdd
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
