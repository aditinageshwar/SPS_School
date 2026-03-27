import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "../../assets/styles/main.css";

const Promotions = () => {
  const [promotionHistory, setPromotionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("history"); // history or promotionForm
  const [bulkPromotionData, setBulkPromotionData] = useState({
    currentClass: "",
    currentSection: "",
    newClass: "",
    newSection: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [classes, setClasses] = useState([]); // Dynamic classes from database
  const [sections] = useState(["A", "B", "C", "D"]);

  useEffect(() => {
    fetchClassNames(); // Fetch available classes on component mount
  }, []);

  useEffect(() => {
    if (activeTab === "history") {
      fetchPromotionHistory();
    }
  }, [activeTab]);

  const fetchClassNames = async () => {
    try {
      const response = await API.get("/api/admin/student-admin/classes");
      setClasses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching class names:", error);
    }
  };

  const fetchPromotionHistory = async () => {
    try {
      setLoading(true);
      setStatusMessage('');
      const response = await API.get(
        "/api/admin/student-admin/promotions/history"
      );
      setPromotionHistory(response.data.data || []);
      if (response.data.data && response.data.data.length === 0) {
        setStatusMessage('No promotion history available yet');
      }
    } catch (error) {
      console.error("Error fetching promotion history:", error);
      const errorMsg = error.response?.data?.message || "Failed to fetch promotion history";
      setStatusMessage(errorMsg);
      setPromotionHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkPromotionChange = (e) => {
    const { name, value } = e.target;
    setBulkPromotionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBulkPromotion = async (e) => {
    e.preventDefault();

    if (
      !bulkPromotionData.currentClass ||
      !bulkPromotionData.newClass ||
      !bulkPromotionData.newSection
    ) {
      setStatusMessage("Please fill in all required fields");
      return;
    }

    if (!window.confirm("Are you sure you want to promote these students? This action cannot be undone.")) {
      return;
    }

    try {
      setLoading(true);
      const response = await API.post(
        "/api/admin/student-admin/promotions/bulk",
        bulkPromotionData
      );
      setStatusMessage(
        `Promotion successful! ${response.data.count} students promoted.`
      );
      setBulkPromotionData({
        currentClass: "",
        currentSection: "",
        newClass: "",
        newSection: "",
      });
      // Optionally refresh history
      setTimeout(() => {
        fetchPromotionHistory();
        fetchClassNames(); // Refresh class names after promotion
      }, 500);
    } catch (error) {
      console.error("Error promoting students:", error);
      setStatusMessage(
        error.response?.data?.message || "Failed to promote students"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Student Promotions</h2>

      {statusMessage && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: statusMessage.includes("Failed") ? "#f8d7da" : "#d4edda",
            color: statusMessage.includes("Failed") ? "#721c24" : "#155724",
            borderRadius: "4px",
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* Tabs */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #dee2e6" }}>
        <button
          onClick={() => setActiveTab("history")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "history" ? "#007bff" : "#f8f9fa",
            color: activeTab === "history" ? "white" : "#333",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📊 Promotion History
        </button>
        <button
          onClick={() => setActiveTab("promotionForm")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "promotionForm" ? "#007bff" : "#f8f9fa",
            color: activeTab === "promotionForm" ? "white" : "#333",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ⬆️ Promote Students
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Promotion History Tab */}
      {activeTab === "history" && (
        <div>
          <h3>Promotion History</h3>
          {promotionHistory.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Student Name</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Email</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Promotions</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionHistory.map((student) => (
                    <tr key={student._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td style={{ padding: "12px" }}>{student.user?.name || "N/A"}</td>
                      <td style={{ padding: "12px" }}>{student.user?.email || "N/A"}</td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                          {student.promotionHistory && student.promotionHistory.length > 0 ? (
                            student.promotionHistory.map((promotion, idx) => (
                              <div
                                key={idx}
                                style={{
                                  marginBottom: "8px",
                                  padding: "8px",
                                  backgroundColor: "#e7f3ff",
                                  borderLeft: "3px solid #007bff",
                                  borderRadius: "3px",
                                  fontSize: "13px",
                                }}
                              >
                                <div>
                                  <strong>{promotion.from}</strong> → <strong>{promotion.to}</strong>
                                </div>
                                <div style={{ fontSize: "12px", color: "#666", marginTop: "3px" }}>
                                  {new Date(promotion.promotedAt).toLocaleDateString()}
                                </div>
                              </div>
                            ))
                          ) : (
                            <span style={{ color: "#999" }}>No promotions yet</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#999" }}>No promotion history available</p>
          )}
        </div>
      )}

      {/* Promotion Form Tab */}
      {activeTab === "promotionForm" && (
        <div>
          <h3>Bulk Promote Students</h3>
          <div style={{ maxWidth: "600px" }}>
            <form onSubmit={handleBulkPromotion}>
              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                <h4 style={{ marginTop: 0 }}>Current Class Details</h4>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Current Class: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="currentClass"
                    value={bulkPromotionData.currentClass}
                    onChange={handleBulkPromotionChange}
                    placeholder="e.g., Class 9, 9th Grade, etc."
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Current Section: <span style={{ color: "#999" }}>(Optional)</span>
                  </label>
                  <select
                    name="currentSection"
                    value={bulkPromotionData.currentSection}
                    onChange={handleBulkPromotionChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">-- Leave empty to promote all sections --</option>
                    {sections.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                <h4 style={{ marginTop: 0 }}>⬆️ New Class Details</h4>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    New Class: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="newClass"
                    value={bulkPromotionData.newClass}
                    onChange={handleBulkPromotionChange}
                    placeholder="e.g., Class 10, 10th Grade, etc."
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    New Section: <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="newSection"
                    value={bulkPromotionData.newSection}
                    onChange={handleBulkPromotionChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">-- Select New Section --</option>
                    {sections.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffc107",
                  borderRadius: "4px",
                  color: "#856404",
                }}
              >
                ⚠️ <strong>Warning:</strong> This action will promote all students in the selected class/section to the new class/section. This action cannot be undone.
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  {loading ? "Processing..." : "✓ Promote Students"}
                </button>
                <button
                  type="reset"
                  onClick={() =>
                    setBulkPromotionData({
                      currentClass: "",
                      currentSection: "",
                      newClass: "",
                      newSection: "",
                    })
                  }
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    flex: 1,
                    fontWeight: "bold",
                  }}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotions;