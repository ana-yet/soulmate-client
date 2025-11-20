import React from "react";
import Banner from "../Banner/Banner";
import PremiumMember from "../PrmiumMember/PremiumMember";
import SuccessStoriesSection from "../SuccessStoriesSection/SuccessStoriesSection";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";
import SuccessCounterSection from "../SuccessCounterSection/SuccessCounterSection";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import TestimonialsCarousel from "../TestimonialsCarousel/TestimonialsCarousel";
import CTASection from "../CTASection/CTASection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <section>
        <Banner />
      </section>
      <section>
        <FeaturesSection />
      </section>
      <section>
        <PremiumMember />
      </section>
      <section>
        <HowItWorksSection />
      </section>
      <section>
        <SuccessCounterSection />
      </section>
      <section>
        <TestimonialsCarousel />
      </section>
      <section>
        <SuccessStoriesSection />
      </section>
      <section>
        <CTASection />
      </section>
    </div>
  );
};

export default Home;

