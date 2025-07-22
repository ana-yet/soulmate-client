import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const CounterCard = ({ icon, end, title, color, suffix = "" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-secondary p-8 rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border text-center"
    >
      <div
        className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div className="mt-6 text-4xl font-bold text-txt dark:text-dark-text">
        {inView ? <CountUp end={end} duration={2.5} separator="," /> : "0"}
        {suffix}+
      </div>
      <p className="mt-2 text-lg text-txt/70 dark:text-dark-text-muted">
        {title}
      </p>
    </motion.div>
  );
};
export default CounterCard;
