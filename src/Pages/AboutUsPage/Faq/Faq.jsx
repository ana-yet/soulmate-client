import React from "react";
import FaqAccordion from "./FaqAccordion";
import { FaQuestionCircle } from "react-icons/fa";
import SectionHeader from "../SectionHeader";

// --- FAQ Data ---
const faqData = {
  General: [
    {
      q: "What is the purpose of this website?",
      a: "Our platform is a dedicated relationship service designed to help individuals find compatible life partners in a way that’s thoughtful, respectful, and rooted in shared values.",
    },
    {
      q: "Is this service free to use?",
      a: "Creating a biodata and browsing profiles is free. To access contact information, you need to either become a premium member or pay a one-time fee per request.",
    },
  ],
  Biodata: [
    {
      q: "What information should I include in my biodata?",
      a: "Be honest and thorough. Include details about your religious practice, education, profession, family background, and what you are looking for in a partner.",
    },
    {
      q: "Can I hide my profile?",
      a: "Yes, you can temporarily disable your profile from being publicly visible through your dashboard settings.",
    },
  ],
  "Premium Membership": [
    {
      q: "What are the benefits of a premium membership?",
      a: "Premium members get priority listing, unlimited contact requests, and access to advanced search filters to help them find a match faster.",
    },
  ],
};

const Faq = () => {
  return (
    <section
      id="faq"
      className="py-16 sm:py-20 bg-secondary/10 dark:bg-dark-secondary/50"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Have questions? We've got answers. Here are some of the most common queries we receive."
          icon={<FaQuestionCircle className="text-3xl text-accent" />}
        />
        <div className="max-w-3xl mx-auto">
          {Object.entries(faqData).map(([category, faqs]) => (
            <div key={category} className="mb-8">
              <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-4">
                {category}
              </h3>
              {faqs.map((faq, index) => (
                <FaqAccordion key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
