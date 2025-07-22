import React from "react";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useSingleBiodata from "../../Hook/useSingleBiodata";
import BackButton from "../../Shared/BackButton/BackButton";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { id } = useParams();
  const { data: biodata, isLoading, error } = useSingleBiodata(id);

  if (error)
    return (
      <p className="text-center p-10 text-accent">Something went wrong.</p>
    );

  return (
    <div className="bg-background dark:bg-dark-bg min-h-screen py-12 sm:py-16 px-4">
      <Helmet>
        <title>CheckOut | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="text-center mb-8">
          <h1 className="font-secondary text-4xl font-bold text-txt dark:text-dark-text">
            Request Contact Information
          </h1>
          {isLoading || !biodata ? (
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mt-2 animate-pulse"></div>
          ) : (
            <p className="mt-2 text-txt/70 dark:text-dark-text-muted">
              You are about to request contact info for{" "}
              <span className="font-bold text-accent">{biodata.name}</span> for
              a one-time fee of $5.
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-dark-secondary p-8 rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border">
          <Elements stripe={stripePromise}>
            <CheckoutForm biodata={biodata} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
