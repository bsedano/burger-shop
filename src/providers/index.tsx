import { ReactNode } from "react";
import ProductsProvider from "./products";
import CartProvider from "./cart";
import AuthProvider from "./auth";
import RegisterProvider from "./register";
interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <RegisterProvider>
          <AuthProvider>{children}</AuthProvider>
        </RegisterProvider>
      </CartProvider>
    </ProductsProvider>
  );
};

export default Providers;
