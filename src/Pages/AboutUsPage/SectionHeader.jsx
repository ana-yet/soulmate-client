import { motion } from "framer-motion";
const SectionHeader = ({ title, subtitle, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <div className="inline-flex items-center justify-center p-4  rounded-full mb-4">
      {icon}
    </div>
    <h2 className="font-secondary text-3xl  font-bold text-txt dark:text-dark-text">
      {title}
    </h2>
    <p className="mt-3 max-w-2xl mx-auto text-txt/70 dark:text-dark-text-muted">
      {subtitle}
    </p>
  </motion.div>
);
export default SectionHeader;
