import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineMail, HiOutlineIdentification } from "react-icons/hi";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const CheckoutForm = ({ biodata }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");

  const paymentAmount = 5;

  // Fetch the client secret from the backend when the component mounts
  useEffect(() => {
    if (paymentAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: paymentAmount })
        .then((res) => {
          // In a real app, the response would be from your API
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          toast.error("Could not initialize payment.");
        });
    }
  }, [axiosSecure, paymentAmount]);

  const onFormSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    setCardError("");
    const toastId = toast.loading("Processing payment...");

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setCardError(methodError.message);
      toast.error(methodError.message, { id: toastId });
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      toast.error(confirmError.message, { id: toastId });
      return;
    }

    if (paymentIntent.status !== "succeeded") {
      toast.error("Payment did not complete.", { id: toastId });
      return;
    }

    // --- Payment Successful ---
    try {
      const contactRequest = {
        requestedBiodataId: biodata?.biodataId,
        requesterEmail: user.email,
      };

      // Send request to your backend to save the contact request
      await axiosSecure.post("/biodata-requests", contactRequest);

      toast.success("Payment successful! Request submitted.", { id: toastId });
      navigate("/dashboard/my-contact-requests");
    } catch (err) {
      toast.error(
        "Payment succeeded, but failed to save the request. Please contact support.",
        { id: toastId }
      );
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#3C322E",
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#A8A8A8",
        },
      },
      invalid: {
        color: "#8E242C",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Toaster position="top-center" />
      <div className="space-y-6">
        {/* Readonly Fields */}
        <div>
          <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1">
            Biodata ID
          </label>
          <div className="relative">
            <HiOutlineIdentification className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              value={biodata && biodata.biodataId ? biodata.biodataId : ""}
              readOnly
              className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-mono text-txt/70 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text-muted"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1">
            Your Email
          </label>
          <div className="relative">
            <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="email"
              value={user && user.email ? user.email : ""}
              readOnly
              className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 pl-10 pr-4 font-mono text-txt/70 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text-muted"
            />
          </div>
        </div>

        {/* Stripe Card Element */}
        <div>
          <label className="block text-sm font-medium text-txt/80 dark:text-dark-text-muted mb-1">
            Card Details
          </label>
          <div className="p-3 rounded-lg border border-secondary/50 bg-background dark:bg-dark-bg dark:border-dark-border">
            <CardElement options={cardElementOptions} />
          </div>
          {cardError && (
            <p className="text-xs text-red-500 mt-1">{cardError}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={!stripe || !clientSecret || isSubmitting}
          className="w-full inline-flex justify-center rounded-lg bg-accent py-3 px-8 font-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
        >
          {isSubmitting ? "Processing..." : `Pay $${paymentAmount}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
