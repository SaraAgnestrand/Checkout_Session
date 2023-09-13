import { PropsWithChildren, createContext, useState, useEffect } from "react";


export interface ICustomer {
    name: string,
    email: string,
    password: string
}
export interface Credentials {
    email: string,
    password: string
  }


 interface  CustomerContext{
    login: (credentials: Credentials) => void,
    // registerCustomer: () => void
}
export const CustomerContext = createContext<CustomerContext>(null as any)
function CustomerProvider({ children }: PropsWithChildren) {

    const [loggedinCustomer, setLoggedinCustomer] = useState(null)
    


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
      }
    
      } catch (error) {
        console.log("Fel vid inloggning:", error);
    }
  }

    
//registerCustomer
return(
    <CustomerContext.Provider value= {{ login  }}>  
        {children} 
    </CustomerContext.Provider>
)
};

export default CustomerProvider