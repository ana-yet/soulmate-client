import { motion } from "framer-motion";

const Step = ({ step, icon, title, description, isReversed, illustration }) => {
  const content = (
    <div className="flex-1 flex justify-center md:items-start flex-col items-center md:w-xl mx-auto text-center md:text-left ">
      {icon}
      <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mt-4 mb-2">
        {title}
      </h3>
      <p className="text-txt/70 dark:text-dark-text-muted">{description}</p>
    </div>
  );

  const illustrations = (
    <div
      className={`flex-1 flex items-center  ${
        isReversed ? "justify-end" : "justify-start"
      }`}
    >
      <div className="w-64 h-48 bg-secondary/20 dark:bg-dark-border rounded-lg flex items-center justify-start">
        <img src={illustration} alt="" />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col md:flex-row items-center gap-20 md:gap-44 ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      {content}
      {illustrations}
    </motion.div>
  );
};

export default Step;
