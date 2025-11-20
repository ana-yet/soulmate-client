import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimes, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

const AdminVerification = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: pendingVerifications = [], isLoading } = useQuery({
    queryKey: ["pendingVerifications"],
    queryFn: async () => {
      // This would need a new endpoint to get all pending verifications
      // For now, returning empty array
      return [];
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (userId) => {
      await axiosSecure.patch(`/api/verification/approve/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingVerifications"]);
      toast.success("Verification approved");
    },
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold gradient-text mb-8">
          Verification Requests
        </h1>

        <div className="grid gap-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : pendingVerifications.length === 0 ? (
            <div className="glass-strong rounded-2xl p-12 text-center">
              <p className="text-txt/50">No pending verification requests</p>
            </div>
          ) : (
            pendingVerifications.map((request) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{request.userName}</h3>
                    <p className="text-txt/70">{request.userEmail}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                      <FaEye className="inline mr-2" />
                      View Documents
                    </button>
                    <button
                      onClick={() => approveMutation.mutate(request.userId)}
                      className="px-4 py-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <FaCheckCircle className="inline mr-2" />
                      Approve
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      <FaTimes className="inline mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;
