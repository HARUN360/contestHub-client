import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk)
const Payment = () => {
    return (
        <div>
            <h1 className="text-center text-4xl font-semibold my-6">Paymetn Now!</h1>
            <div>
            <Elements stripe={stripePromise}>
                 <CheckoutForm></CheckoutForm>
              </Elements>
            </div>
        </div>
    );
};

export default Payment;