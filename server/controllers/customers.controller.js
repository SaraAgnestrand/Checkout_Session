const fs = require("fs");
const bcrypt = require("bcrypt");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const filePath = "./db/customers.json"; 

async function register (req, res) {

    try { 
       
        const { name, email } = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Kolla om användaren redan finns i Stripe (baserat på e-postadress eller annan unik identifierare)
        const existingCustomer = await stripe.customers.list({ email: email });
         if (existingCustomer.data.length > 0) {
            return res.status(409).json("Customer already exists.");
        }
        // Skapa en ny Stripe-kund med användarens e-postadress som identifierare
        const customer = await stripe.customers.create({

            name: name,
            email: email,
            // password: hashedPassword,
        });

        console.log(customer)

        

        let existingCustomers = [];

        if(fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, "utf8");
            existingCustomers = JSON.parse(fileData);
        }

        if (!Array.isArray(existingCustomers)) {
            existingCustomers = [];
        }

            const newCustomer = {
            name: name,
            email: email,
            password: hashedPassword,
            stripeCustomerId: customer.id
        };

        existingCustomers.push(newCustomer);

        const jsonData = JSON.stringify(existingCustomers, null, 2);

        fs.writeFileSync(filePath, jsonData)


        // Här kan du också spara användaruppgifter som metadata i Stripe-kunden
        // await stripe.customers.update(customer.id, {metadata: { name: name },
        // });

        // Nu har du skapat en ny användare i Stripe
        // Lägg logik för att hantera lösenord eller andra användaruppgifter

        res.status(201).json(customer);
    } catch (error) {
        console.error("Fel vid registrering:", error);
        res.status(400).json(error.message);
        
    }
}


async function login(req, res) {
    // Check if username and password is correct
    const dbCustomers = fs.readFileSync(filePath)
    const customers = JSON.parse(dbCustomers)
    console.log("body: " + req.body)
    const existingCustomer = customers.find(customer => customer.email = req.body.email)
    console.log("hej")
    console.log(existingCustomer);
    console.log(req.body);
    
    if (
      !existingCustomer ||
      !(await bcrypt.compare(req.body.password, existingCustomer.password))
    ) {
      return res.status(401).json("Wrong password or username");

    }
  
    if (req.session.id) {
      return res.status(200).json(existingCustomer);
    }
    // Save info about the user to the session (an encrypted cookie stored on the client)
    req.session = existingCustomer;
    res.status(200).json(existingCustomer);
  }


module.exports = { register, login  } //login


 

