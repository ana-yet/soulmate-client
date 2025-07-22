import { motion } from "framer-motion";
const TeamMemberCard = ({ image, name, role }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-white dark:border-dark-secondary"
    />
    <h4 className="mt-4 font-bold text-lg text-txt dark:text-dark-text">
      {name}
    </h4>
    <p className="text-sm text-accent">{role}</p>
  </motion.div>
);
export default TeamMemberCard;
