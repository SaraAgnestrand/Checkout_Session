import { useState, useEffect } from "react";
// import Cart from "../Cart/Cart";
import "./Home.css";


interface IPrice {
  id: string;
  unit_amount: number;
}
interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string;
  default_price: IPrice;
}
// Skapa ett nytt interface för kundvagnsposten
 export interface ICart {
  id: string;
  quantity: number;
}


async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    const productsWithImages = data.data.map((product: IProduct) => ({
      ...product,
      image: product.images,
    }));
    return productsWithImages;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  // Uppdatera cart för att använda CartItem istället för IProduct
  const [cart, setCart] = useState<ICart[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    getProducts();
  }, []);
  // Uppdatera addToCart-funktionen för att bara lägga till id och quantity i kundvagnen
  const addToCart = (product: IProduct) => {
    const existingCartItem = cart.find((item) => item.id === product.default_price.id);


    if (existingCartItem) {
      // Om produkten redan finns, öka bara antalet
      const updatedCart = cart.map((item) =>
        item.id === product.default_price.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart",JSON.stringify(updatedCart))
    } else {
     
      setCart([...cart, { id: product.default_price.id, quantity: 1 }]);

      localStorage.setItem("cart", JSON.stringify([...cart, { id: product.default_price.id, quantity: 1 }]))
    }
    
  };
  console.log("Products:", products);
  console.log("Cart:", cart);

return (
   
    <div className="main-content">
        
      {products.map((product) => (  
          <div className="product-item" key={product.id}>
            <img src={product.images} alt={product.name} />
            <div className="title-price">
              <h4>{product.name}</h4>
              <h5>{product.default_price.unit_amount/100} kr</h5>
            </div>
            <p>{product.description}</p>
            
            <button className="buy-button" onClick={() => { addToCart(product);  }}>Köp</button>
            
          </div>
          
      ))}

      
    </div>
  );
}

export default Home;

 

 
