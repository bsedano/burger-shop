import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface ProductsProps {
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

interface ProductsProviderData {
  products: Product[];
  productsFilter: (category: string) => Product[];
  search: string;
  setSearch: (search: string) => void;
}

const ProductsContext = createContext<ProductsProviderData>(
  {} as ProductsProviderData
);

const ProductsProvider = ({ children }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [search, setSearch] = useState<string>("");

  const productsFilter = (category: string) => {
    return products.filter(
      (product) =>
        product.category.toLowerCase().includes(category.toLowerCase()) ||
        product.name.toLowerCase().includes(category.toLowerCase())
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data))
      .then((err) => console.log(err));
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, productsFilter, search, setSearch }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

export const useProducts = () => useContext(ProductsContext);
