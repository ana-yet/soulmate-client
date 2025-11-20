import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

const AdvancedFilters = ({ onApplyFilters, onClose }) => {
  const [filters, setFilters] = useState({
    education: [],
    occupation: [],
    heightMin: "",
    heightMax: "",
    religion: "",
    maritalStatus: "",
  });

  const educationLevels = [
    "High School",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Diploma",
  ];

  const occupations = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Business Owner",
    "IT Professional",
    "Government Employee",
    "Other",
  ];

  const religions = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];
  const maritalStatuses = ["Never Married", "Divorced", "Widowed"];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      education: [],
      occupation: [],
      heightMin: "",
      heightMax: "",
      religion: "",
      maritalStatus: "",
    });
  };

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="text-accent" />
          <h3 className="text-xl font-bold">Advanced Filters</h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        {/* Education */}
        <div>
          <label className="block font-semibold mb-3">Education Level</label>
          <div className="flex flex-wrap gap-2">
            {educationLevels.map((edu) => (
              <button
                key={edu}
                onClick={() => toggleArrayFilter("education", edu)}
                className={`px-4 py-2 rounded-full transition-all ${
                  filters.education.includes(edu)
                    ? "bg-gradient-primary text-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              >
                {edu}
              </button>
            ))}
          </div>
        </div>

        {/* Occupation */}
        <div>
          <label className="block font-semibold mb-3">Occupation</label>
          <div className="flex flex-wrap gap-2">
            {occupations.map((occ) => (
              <button
                key={occ}
                onClick={() => toggleArrayFilter("occupation", occ)}
                className={`px-4 py-2 rounded-full transition-all ${
                  filters.occupation.includes(occ)
                    ? "bg-gradient-primary text-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Height Range */}
        <div>
          <label className="block font-semibold mb-3">Height Range (cm)</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.heightMin}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, heightMin: e.target.value }))
              }
              className="px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.heightMax}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, heightMax: e.target.value }))
              }
              className="px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Religion */}
        <div>
          <label className="block font-semibold mb-3">Religion</label>
          <select
            value={filters.religion}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, religion: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
          >
            <option value="">All Religions</option>
            {religions.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block font-semibold mb-3">Marital Status</label>
          <select
            value={filters.maritalStatus}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maritalStatus: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-txt/10 focus:border-accent focus:outline-none"
          >
            <option value="">All Statuses</option>
            {maritalStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={handleReset}
          className="flex-1 py-3 rounded-xl bg-white/50 hover:bg-white/80 font-semibold transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover:scale-105 transition-transform"
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
};

export default AdvancedFilters;
