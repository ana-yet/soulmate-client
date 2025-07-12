import React from "react";
import Banner from "../Banner/Banner";
import PremiumMember from "../PrmiumMember/PremiumMember";

const Home = () => {
  return (
    <div className="">
      <section>
        <Banner />
      </section>
      <section>
        <PremiumMember />
      </section>
    </div>
  );
};

export default Home;
