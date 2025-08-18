import React from "react";
import { Link } from "react-router";
const StatCard = ({ title, value, icon, children, link }) => (
  <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-md border border-secondary/20 dark:border-dark-border p-6 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-txt/70 dark:text-dark-text-muted text-sm font-medium">
          {title}
        </h3>
        <p className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mt-1">
          {value}
        </p>
      </div>
      <div className="p-3 rounded-full bg-secondary/10 dark:bg-dark-secondary/70 text-accent dark:text-dark-utility">
        {icon}
      </div>
    </div>
    <div className="flex-grow h-40">{children}</div>
    {link && (
      <Link
        to={link.to}
        className="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium text-center"
      >
        {link.text}
      </Link>
    )}
  </div>
);

export default StatCard;
