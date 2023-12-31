import { PropsWithChildren, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface ICustomer {
    name: string,
    email: string,
    password: string
}
export interface Credentials {
    email: string,
    password: string
  }
interface CustomerContext {
  login: (credentials: Credentials) => void;
  registerCustomer: (credentials: ICustomer) => void;
  loggedinCustomer: ICustomer | null;
}
export const CustomerContext = createContext<CustomerContext | null>(null);

function CustomerProvider({ children }: PropsWithChildren) {

    const [loggedinCustomer, setLoggedinCustomer] = useState(null)
    const navigate = useNavigate();
    
async function registerCustomer(credentials:ICustomer) {
  try {
    const res = await fetch("/api/customers/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    if (res.ok) {
      const customer = await res.json()
      console.log("Inloggning lyckades. Serverrespons:", res);
      setLoggedinCustomer(customer);
    }
    } catch (error) {
      console.log(error);
  }

}

async function login(credentials: Credentials) {
    try {
      const res = await fetch("/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      if (res.ok) {
        const customer = await res.json()
        console.log("Inloggning lyckades. Serverrespons:", res);
        setLoggedinCustomer(customer);
        navigate('/');
      }
    
      } catch (error) {
        console.log("Fel vid inloggning:", error);
    }
  }

return(
  <CustomerContext.Provider value={{ login, registerCustomer, loggedinCustomer }}>  
        {children} 
    </CustomerContext.Provider>
)
};

export default CustomerProvider
