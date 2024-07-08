import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hukse/useAxiosPublic";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hukse/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const items = useLoaderData();
    const { _id, name, image, contestType, price, priceMoney, description, date, } = items;
    console.log('price', price);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();


    useEffect(() => {

        axiosPublic.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log('clientSecret', res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })


    }, [axiosPublic, price])


    const handleSubmit = async (event) => {
        event.preventDefault();
        const task = event.target.task.value;
        console.log(task);
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('pagment method', paymentMethod);
            setError('');
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log('trnasaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    name: user.displayName,
                    email: user.email,
                    image: user?.photoURL,
                    price: price,
                    contestimage: image,
                    priceMoney: priceMoney,
                    description: description,
                    contestdate: date,
                    contestName: name,
                    contestType: contestType,
                    transactionId: paymentIntent.id,
                    date: new Date(), //utc date convert. use moment js to
                    contestId: _id,
                    task: task,
                    paymentstatus: 'stripe',
                }

                const res = await axiosPublic.post('/payments', payment);
                console.log('payment save', res.data);

                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for Payments",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                }
            }
        }

    }
    return (
        <div className="md:mx-20">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
              

                {/* price money */}
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Please Submitted Task( use drive or any link ):</span>

                    </div>
                    <input type="url" name="task" placeholder="https://example.com" className="input input-bordered w-full" required />

                </label>
                {/* code extra start */}
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>Pay</button>
                {/* code extra end */}

                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;