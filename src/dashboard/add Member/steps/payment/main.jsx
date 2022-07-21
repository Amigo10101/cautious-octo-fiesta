import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./style.css";
import { message } from "antd";

import useId from "../../../../useId";
import useToken from "../../../../useToken";
import moment from "moment";

const CARD_OPTIONS = {  
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#4a4a4a",
      color: "#4a4a4a",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#4a4a4a",
      },
      "::placeholder": {
        color: "#4a4a4a",
      },
    },
    invalid: {
      iconColor: "#ff3737",
      color: "#ff3737",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    {children}
  </div>
);

const CheckoutForm = (props) => {
  const stripe = useStripe();

  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { Id, setId } = useId();
  const { token, setToken } = useToken();
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    Address: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postdata = (propsdata) => {
      const axios = require("axios");
      let data = JSON.stringify({
        email: props.state2.email,
        first_name: props.state2.first_name,
        middle_name: props.state2.middle_name,
        last_name: props.state2.last_name,
        gender: props.state2.gender,
        date_of_birth: moment(props.state2.date_of_birth).format("YYYY-MM-DD"),
        address_1: props.state2.address_1,
        address_2: props.state2.address_2,
        zip: props.state2.zip,
        city: props.state2.city,
        state: props.state2.state,
        language: props.state2.language,
        phone_number: props.state2.phone_number,
        package: props.state2.package,
        recurring: props.state2.recurring,
        terms: props.state2.terms,
        language: props.state2.language,
        card_source: propsdata.token.id,
      });

      let config = {
        method: "post",
        url:
          "https://backend-demo.revmd.co/api/v1/" +
          Id.affiliated_office +
          "/memberships/",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          Authorization: "Token" + " " + `${token}`,
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          message.success("member added");
          window.location.replace("/dashboard/member/registeredmembers");
          sessionStorage.removeItem("__LSM__");
        })
        .catch((error) => {
          console.log(error);
          message.error(error.response.data);
        });
    };
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
    }

    const cardElement1 = elements.getElement("card");

    stripe.createToken(cardElement1).then((payload) => postdata(payload));
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <div className="fs-14">Email</div>
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <div className="fs-14">Name on Card</div>
        <Field
          label="Address"
          id="name"
          type="text"
          placeholder="Name"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <div className="fs-14">Address</div>
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="Address"
          required
          autoComplete="address"
          value={billingDetails.Address}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, Address: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup pt-2 py-0">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
        <div>{error && <ErrorMessage>{error.message}</ErrorMessage>}</div>
      </fieldset>

      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay ${props.payprice}
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_WgSgBjzehSZvA8VStYqrplyM");

export const Stripepage = (props) => {
  console.log("wadawd", props.price);
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm state2={props.inputvals} payprice={props.price} />
      </Elements>
    </div>
  );
};
