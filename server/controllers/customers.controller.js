const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

async function register (req, res) {

    try { 
        const { name, email } = req.body;

        // Kolla om användaren redan finns i Stripe (baserat på e-postadress eller annan unik identifierare)
        const existingCustomer = await stripe.customers.list({ email: email });
        if (existingCustomer.data.length > 0) {
            return res.status(409).json("Customer already exists.");
        }
        // Skapa en ny Stripe-kund med användarens e-postadress som identifierare
        const customer = await stripe.customers.create({
            name: name,
            email: email,
        });

        console.log(customer)

        const filePath = "./db/customers.json";

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

//function loginAsCustomer
module.exports = { register }


 

