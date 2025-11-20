import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const CounterCard = ({
  icon,
  end,
  title,
  color = "from-accent to-accent-light",
  iconBg = "bg-accent/20",
  suffix = "",
  delay = 0,
  decimals = 0,
}) => {
  const [startCounter, setStartCounter] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setStartCounter(true), delay * 300);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.15 }}
      className="group relative glass-strong p-8 rounded-2xl overflow-hidden hover-lift"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

      {/* Icon with gradient background */}
      <motion.div
        className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center ${iconBg} text-white relative overflow-hidden`}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80`}></div>
        <div className="relative z-10">{icon}</div>
      </motion.div>

      {/* Counter with dynamic scaling */}
      <motion.div
        className="mt-6 text-5xl font-bold gradient-text"
        whileHover={{ scale: 1.05 }}
      >
        {startCounter ? (
          <CountUp end={end} duration={2.5} separator="," decimals={decimals} />
        ) : (
          "0"
        )}
        {suffix && (
          <span className="text-3xl ml-1">
            {suffix}
          </span>
        )}
      </motion.div>

      {/* Title */}
      <div className="mt-4 relative">
        <p className="text-lg text-txt/80 dark:text-dark-text-muted font-medium">
          {title}
        </p>
        {/* Animated underline */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-0 group-hover:w-full rounded-full`}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </div>

      {/* Decorative corner gradient */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500`}></div>
    </motion.div>
  );
};

export default CounterCard;

