import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "../../assets/styles/main.css";

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [approveData, setApproveData] = useState({
    className: "",
    section: "",
  });
  const [rejectReason, setRejectReason] = useState("");
  const [modalAction, setModalAction] = useState(""); // "approve" or "reject"
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setStatusMessage('');
      const response = await API.get("/api/admin/student-admin/admissions");
      setAdmissions(response.data.data || []);
      if (response.data.data?.length === 0) {
        setStatusMessage('No admissions available');
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
      const errorMsg = error.response?.data?.message || "Failed to fetch admissions";
      setStatusMessage(errorMsg);
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (admission) => {
    setSelectedAdmission(admission);
    setModalAction("approve");
    setApproveData({ className: "", section: "" });
    setRejectReason("");
    setShowModal(true);
  };

  const handleApproveSubmit = async (e) => {
    e.preventDefault();
    if (!approveData.className || !approveData.section) {
      setStatusMessage("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await API.post(
        `/api/admin/student-admin/admissions/${selectedAdmission._id}/approve`,
        approveData
      );
      setStatusMessage("Admission approved successfully!");
      setShowModal(false);
      fetchAdmissions();
    } catch (error) {
      console.error("Error approving admission:", error);
      setStatusMessage("Failed to approve admission");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = (admission) => {
    setSelectedAdmission(admission);
    setModalAction("reject");
    setApproveData({ className: "", section: "" });
    setRejectReason("");
    setShowModal(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await API.post(
        `/api/admin/student-admin/admissions/${selectedAdmission._id}/reject`,
        { reason: rejectReason }
      );
      setStatusMessage("Admission rejected successfully!");
      setShowModal(false);
      fetchAdmissions();
    } catch (error) {
      console.error("Error rejecting admission:", error);
      setStatusMessage("Failed to reject admission");
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmissions = admissions.filter((adm) => {
    if (filter === "all") return true;
    return adm.status.toLowerCase() === filter;
  });

  return (
    <div className="admissions-container" style={{ padding: "20px" }}>
      <h2>📋 Admissions Management</h2>

      {statusMessage && (
        <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "4px" }}>
          {statusMessage}
        </div>
      )}

      {/* Filter */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label>Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {/* Admissions Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Applicant Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Phone</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmissions.length > 0 ? (
              filteredAdmissions.map((admission) => (
                <tr key={admission._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td style={{ padding: "12px" }}>{admission.student?.user?.name || "N/A"}</td>
                  <td style={{ padding: "12px" }}>{admission.student?.user?.email || "N/A"}</td>
                  <td style={{ padding: "12px" }}>{admission.student?.user?.phone || "N/A"}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "4px",
                        backgroundColor:
                          admission.status === "Pending"
                            ? "#fff3cd"
                            : admission.status === "Approved"
                            ? "#d4edda"
                            : "#f8d7da",
                        color:
                          admission.status === "Pending"
                            ? "#856404"
                            : admission.status === "Approved"
                            ? "#155724"
                            : "#721c24",
                      }}
                    >
                      {admission.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {admission.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleApproveClick(admission)}
                          style={{
                            padding: "6px 12px",
                            marginRight: "5px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleRejectClick(admission)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          ✕ Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                  No admissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Approve/Reject */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              {modalAction === "approve" ? "Approve Admission" : "Reject Admission"}
            </h3>

            <p style={{ marginBottom: "20px", color: "#666" }}>
              <strong>Applicant:</strong> {selectedAdmission?.student?.user?.name}
            </p>

            {modalAction === "approve" ? (
              <form onSubmit={handleApproveSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Class Name:</label>
                  <input
                    type="text"
                    value={approveData.className}
                    onChange={(e) => setApproveData({ ...approveData, className: e.target.value })}
                    placeholder="e.g., Class 10"
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Section:</label>
                  <input
                    type="text"
                    value={approveData.section}
                    onChange={(e) => setApproveData({ ...approveData, section: e.target.value })}
                    placeholder="e.g., A"
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: loading ? "not-allowed" : "pointer",
                      flex: 1,
                    }}
                  >
                    {loading ? "Processing..." : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      flex: 1,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : modalAction === "reject" ? (
              <form onSubmit={handleRejectSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Reason for Rejection:</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    required
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: loading ? "not-allowed" : "pointer",
                      flex: 1,
                    }}
                  >
                    {loading ? "Processing..." : "Reject"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      flex: 1,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissions;