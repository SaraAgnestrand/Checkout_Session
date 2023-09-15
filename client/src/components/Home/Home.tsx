import { useState, useEffect } from "react";
import "./Home.css";
interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string;
}

async function fetchProducts() {
  try {
    const response = await fetch("/api/products"); // Anpassa sökvägen till din server
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    const productsWithImages = data.data.map((product: IProduct) => ({
      ...product,
      image: product.images // Lägg till en standardbild-URL om det inte finns någon bild
    }));
      return data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function Home() {

   
      const [products, setProducts] = useState<IProduct[]>([]);
      console.log("hejsan")
  useEffect(() => {
    console.log("in useeffect..")
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    getProducts();
  }, []);

  return (
   
    <div className="main-content">
      {products.map((product) => (
        <div className="product-div">
          <div key={product.id}>
            <img src={product.images} alt={product.name} />
            <h1>{product.name}</h1>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
            <button>Köp</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

 

 
