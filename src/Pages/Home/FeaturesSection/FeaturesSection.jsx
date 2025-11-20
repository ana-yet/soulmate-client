import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaComments, FaLock, FaUserShield } from "react-icons/fa";

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: FaUserShield,
      title: "Verified Profiles",
      description: "Every profile is verified to ensure authenticity and safety for all members",
      color: "text-green-500",
      gradient: "from-green-500/20 to-green-600/20",
    },
    {
      icon: FaCheckCircle,
      title: "Smart Matching",
      description: "Advanced algorithms to find compatible partners based on your preferences",
      color: "text-blue-500",
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: FaComments,
      title: "Secure Messaging",
      description: "Private and secure communication channels to connect with potential matches",
      color: "text-purple-500",
      gradient: "from-purple-500/20 to-purple-600/20",
    },
    {
      icon: FaLock,
      title: "Privacy First",
      description: "Your personal information is protected with industry-leading security",
      color: "text-accent",
      gradient: "from-accent/20 to-accent-light/20",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 gradient-text ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Why Choose SoulMate?
          </h2>
          <p
            className={`text-lg md:text-xl text-txt/70 max-w-2xl mx-auto ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
          >
            Experience the perfect blend of tradition and technology in finding your life partner
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-soft hover-lift transition-all duration-300 ${
                isVisible ? `animate-fade-in-up delay-${(index + 2) * 100}` : "opacity-0"
              }`}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative z-10">
                <div className={`${feature.color} text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-txt">{feature.title}</h3>
                <p className="text-txt/70 leading-relaxed">{feature.description}</p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-10 rounded-bl-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
