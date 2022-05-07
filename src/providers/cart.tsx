import { createContext, useContext, useState, ReactNode } from "react";

interface CartProps {
  children: ReactNode;
}

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
  category: string;
}

interface CartContextData {
  cart: Product[];
  addCart: (product: Product) => void;
  removeCart: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<Product[]>(cartStorage as Product[]);

  const addCart = (product: Product) => {
    if (!cart.includes(product)) {
      setCart([...cart, product]);
    } else {
      product.quantity += 1;
      setCart([...cart]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeCart = (product: Product) => {
    if (product.quantity === 1) {
      setCart(cart.filter((p) => p.id !== product.id));
    } else {
      product.quantity -= 1;
      setCart([...cart]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
