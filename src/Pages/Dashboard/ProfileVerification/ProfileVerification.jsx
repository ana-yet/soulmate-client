import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUpload, FaCheckCircle, FaClock } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const ProfileVerification = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [documents, setDocuments] = useState([]);

  const { data: verificationData, isLoading } = useQuery({
    queryKey: ["verification", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/verification/status/${user?.email}`);
      return data.data;
    },
    enabled: !!user?.email,
  });

  const submitVerificationMutation = useMutation({
    mutationFn: async (docs) => {
      const { data } = await axiosSecure.post("/api/verification/request", {
        userId: user?.email,
        documents: docs,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verification"]);
      toast.success("Verification request submitted successfully!");
      setDocuments([]);
    },
    onError: () => {
      toast.error("Failed to submit verification request");
    },
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // In production, upload to cloud storage and get URLs
    const fileUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setDocuments([...documents, ...fileUrls]);
  };

  const handleSubmit = () => {
    if (documents.length === 0) {
      toast.error("Please upload at least one document");
      return;
    }
    submitVerificationMutation.mutate(documents);
  };

  const getStatusBadge = (status) => {
    const badges = {
      unverified: {
        icon: FaShieldAlt,
        text: "Not Verified",
        color: "bg-gray-100 text-gray-600",
      },
      pending: {
        icon: FaClock,
        text: "Pending Review",
        color: "bg-yellow-100 text-yellow-600",
      },
      verified: {
        icon: FaCheckCircle,
        text: "Verified",
        color: "bg-green-100 text-green-600",
      },
    };

    const badge = badges[status] || badges.unverified;
    const Icon = badge.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badge.color}`}>
        <Icon />
        <span className="font-medium">{badge.text}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                Profile Verification
              </h1>
              <p className="text-txt/70">Verify your identity to build trust</p>
            </div>
          </div>
          {getStatusBadge(verificationData?.status)}
        </motion.div>

        {/* Content */}
        <div className="glass-strong rounded-2xl p-8">
          {verificationData?.status === "verified" ? (
            <div className="text-center py-12">
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Profile Verified!</h2>
              <p className="text-txt/70">
                Your profile has been successfully verified. You now have a verified badge on your profile.
              </p>
            </div>
          ) : verificationData?.status === "pending" ? (
            <div className="text-center py-12">
              <FaClock className="text-6xl text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Under Review</h2>
              <p className="text-txt/70 mb-6">
                Your verification documents are being reviewed. This usually takes 24-48 hours.
              </p>
              <div className="bg-white/50 rounded-xl p-4 max-w-md mx-auto">
                <h3 className="font-semibold mb-2">Submitted Documents:</h3>
                <ul className="text-sm text-txt/70 space-y-1">
                  {verificationData?.documents?.map((doc, index) => (
                    <li key={index}>• {doc.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Verify Your Profile</h2>
              <p className="text-txt/70 mb-6">
                Upload a government-issued ID and a selfie to verify your identity. This helps build trust in our community.
              </p>

              {/* Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Upload Documents</label>
                <div className="border-2 border-dashed border-txt/20 rounded-xl p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <FaUpload className="text-4xl text-accent/50 mx-auto mb-3" />
                    <p className="text-txt/70 mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-txt/50">PNG, JPG, PDF up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Uploaded Files */}
              {documents.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Uploaded Documents ({documents.length})</h3>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/50 rounded-xl p-3"
                      >
                        <span className="text-sm truncate">{doc.name}</span>
                        <button
                          onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={documents.length === 0 || submitVerificationMutation.isPending}
                className="w-full py-4 rounded-xl bg-gradient-primary text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitVerificationMutation.isPending ? "Submitting..." : "Submit for Verification"}
              </button>

              {/* Info */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Why verify?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Build trust with potential matches</li>
                  <li>✓ Get a verified badge on your profile</li>
                  <li>✓ Increase your profile visibility</li>
                  <li>✓ Access premium features</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileVerification;
