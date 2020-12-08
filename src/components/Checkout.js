import React from "react";
import "./Styles.css";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function Checkout(props) {
  //const stripe = Promise.resolve(props.stripe)
  
  async function handleCheckout() {
    const stripe = window.Stripe('pk_test_51Hv6PdAXIZRaoh9Gbcyov8JCl6iWPOW8l1TDlJDY5QjdipzfSXeVAxpm10WODH2wjEFo9XDO4EKI6fAJzrfSRjmz00r4dlEpre');
    console.log ("stripe: ", (stripe))
    var checkoutButton = document.getElementById("checkout-button");

    fetch("/api/stripe/create-session", {
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }
  return (
    <>
      <section>
        <div className="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        </div>
        <button
          id="checkout-button"
          onClick={() => handleCheckout()}
          
        >
          Checkout
        </button>
      </section>
    </>
  );
}
