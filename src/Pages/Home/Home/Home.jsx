import React from "react";
import Banner from "../Banner/Banner";
import PremiumMember from "../PrmiumMember/PremiumMember";
import SuccessStoriesSection from "../SuccessStoriesSection/SuccessStoriesSection";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";

const Home = () => {
  return (
    <div className="">
      <section>
        <Banner />
      </section>
      <section>
        <PremiumMember />
      </section>
      <section>
        <HowItWorksSection />
      </section>
      <section>
        <SuccessStoriesSection />
      </section>
    </div>
  );
};

export default Home;
