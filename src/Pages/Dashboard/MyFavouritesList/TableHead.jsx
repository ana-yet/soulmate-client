import React from "react";

const TableHead = () => {
  return (
    <thead className="bg-secondary/10 dark:bg-gray-700">
      <tr>
        <th className="p-4 font-semibold text-txt dark:text-gray-300">Name</th>
        <th className="p-4 font-semibold text-txt dark:text-gray-300 hidden md:table-cell">
          Biodata ID
        </th>
        <th className="p-4 font-semibold text-txt dark:text-gray-300 hidden lg:table-cell">
          Permanent Address
        </th>
        <th className="p-4 font-semibold text-txt dark:text-gray-300 hidden md:table-cell">
          Occupation
        </th>
        <th className="p-4 font-semibold text-txt dark:text-gray-300 text-center">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
