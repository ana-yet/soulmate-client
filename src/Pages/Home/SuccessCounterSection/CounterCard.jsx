import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const CounterCard = ({
  icon,
  end,
  title,
  color = "bg-accent text-white",
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
      className="group relative bg-white dark:bg-dark-secondary p-8 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-400 hover:border-transparent"
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-accent/5 dark:group-hover:via-accent/10 transition-all duration-500 -z-10"></div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-purple-500/20 blur-md transition-all duration-700 group-hover:-inset-2"></div>
      </div>

      {/* Icon with floating animation */}
      <motion.div
        className={`mx-auto w-16 h-16 rounded-lg flex items-center justify-center ${color} shadow-sm group-hover:shadow-md transition-all duration-300`}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>

      {/* Counter with dynamic scaling */}
      <motion.div
        className="mt-6 text-4xl font-bold text-gray-800 dark:text-white font-secondary"
        whileHover={{ scale: 1.05 }}
      >
        {startCounter ? (
          <CountUp end={end} duration={2.5} separator="," decimals={decimals} />
        ) : (
          "0"
        )}
        {suffix && (
          <span className="text-2xl text-accent dark:text-accent-light ml-1">
            {suffix}
          </span>
        )}
      </motion.div>

      {/* Animated underline on title */}
      <div className="mt-3 relative inline-block">
        <p className="text-lg text-gray-600 dark:text-gray-300 relative z-10 font-secondary ">
          {title}
        </p>
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full"
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </div>

      {/* Micro-interaction dots */}
      <div className="absolute bottom-4 left-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CounterCard;
