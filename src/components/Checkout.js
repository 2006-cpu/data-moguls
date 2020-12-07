import React from "react";
import "./Styles.css";

export default function Checkout() {
  return (<>
    
    <section>
      <div class="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div class="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <button id="checkout-button" onClick={()=> {
          var stripe = Stripe("pk_test_51Hv6PdAXIZRaoh9Gbcyov8JCl6iWPOW8l1TDlJDY5QjdipzfSXeVAxpm10WODH2wjEFo9XDO4EKI6fAJzrfSRjmz00r4dlEpre");
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
      }}>Checkout</button>
    </section>

  </>
  );
}
