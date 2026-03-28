import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import "../../assets/styles/main.css";

const ClassAllocation = () => {
  const [unallocatedStudents, setUnallocatedStudents] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("unallocated"); // unallocated or byClass
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [allocationData, setAllocationData] = useState({
    className: "",
    section: "",
    rollNumber: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [classes, setClasses] = useState([]); // Dynamic classes from database
  const [sections] = useState(["A", "B", "C", "D"]);

  useEffect(() => {
    fetchClassNames(); // Fetch available classes on component mount
  }, []);

  useEffect(() => {
    if (activeTab === "unallocated") {
      fetchUnallocatedStudents();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedClass && activeTab === "byClass") {
      fetchStudentsByClass();
    }
  }, [selectedClass, activeTab]);

  const fetchClassNames = async () => {
    try {
      const response = await API.get("/api/admin/student-admin/classes");
      setClasses(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching class names:", error);
      setClasses([]);
    }
  };

  const fetchUnallocatedStudents = async () => {
    try {
      setLoading(true);
      setStatusMessage("");
      const response = await API.get(
        "/api/admin/student-admin/allocation/unallocated"
      );
      setUnallocatedStudents(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching unallocated students:", error);
      setStatusMessage("Failed to fetch unallocated students");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsByClass = async () => {
    try {
      setLoading(true);
      setStatusMessage("");
      const response = await API.get(
        `/api/admin/student-admin/classes/${selectedClass}/students`
      );
      setStudentsByClass(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching students by class:", error);
      setStudentsByClass([]);
      setStatusMessage("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleAllocateClick = (student) => {
    setEditingStudent(student);
    setAllocationData({
      className: "",
      section: "",
      rollNumber: "",
    });
    setShowModal(true);
  };

  const handleAllocationFormChange = (e) => {
    const { name, value } = e.target;
    setAllocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAllocation = async (e) => {
    e.preventDefault();

    if (!allocationData.className || !allocationData.section) {
      setStatusMessage("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await API.post(
        `/api/admin/student-admin/allocation/${editingStudent._id}`,
        allocationData
      );
      setStatusMessage("Student allocated to class successfully!");
      setShowModal(false);
      fetchUnallocatedStudents();
      fetchClassNames(); // Refresh class names after allocation
    
      if (activeTab === "byClass" && selectedClass) {
      await fetchStudentsByClass();
      }
    } catch (error) {
      console.error("Error allocating student:", error);
      setStatusMessage(
        error.response?.data?.message || "Failed to allocate student"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReAllocate = (student) => {
    setEditingStudent(student);
    setAllocationData({
      className: student.className || "",
      section: student.section || "",
      rollNumber: student.rollNumber || "",
    });
    setShowModal(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Class Allocation</h2>

      {statusMessage && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "4px",
          }}
        >
          {statusMessage}
        </div>
      )}

      {/* Tabs */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #dee2e6" }}>
        <button
          onClick={() => setActiveTab("unallocated")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "unallocated" ? "#007bff" : "#f8f9fa",
            color: activeTab === "unallocated" ? "white" : "#333",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📌 Unallocated Students
        </button>
        <button
          onClick={() => setActiveTab("byClass")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "byClass" ? "#007bff" : "#f8f9fa",
            color: activeTab === "byClass" ? "white" : "#333",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📚 View by Class
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Unallocated Tab */}
      {activeTab === "unallocated" && (
        <div>
          <h3>Unallocated Students ({unallocatedStudents.length})</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Email</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Phone</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {unallocatedStudents.length > 0 ? (
                  unallocatedStudents.map((student) => (
                    <tr key={student._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td style={{ padding: "12px" }}>{student.user?.name || "N/A"}</td>
                      <td style={{ padding: "12px" }}>{student.user?.email || "N/A"}</td>
                      <td style={{ padding: "12px" }}>{student.user?.phone || "N/A"}</td>
                      <td style={{ padding: "12px" }}>
                        <button
                          onClick={() => handleAllocateClick(student)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          ➕ Allocate
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                      All students have been allocated to classes!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* By Class Tab */}
      {activeTab === "byClass" && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <option value="">-- Choose a class --</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {selectedClass && (
            <div>
              <h3>
                Students in {selectedClass} ({studentsByClass.length})
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Name</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Email</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Section</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Roll No.</th>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByClass.length > 0 ? (
                      studentsByClass.map((student) => (
                        <tr key={student._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                          <td style={{ padding: "12px" }}>{student.user?.name || "N/A"}</td>
                          <td style={{ padding: "12px" }}>{student.user?.email || "N/A"}</td>
                          <td style={{ padding: "12px" }}>{student.section || "N/A"}</td>
                          <td style={{ padding: "12px" }}>{student.rollNumber || "N/A"}</td>
                          <td style={{ padding: "12px" }}>
                            <button
                              onClick={() => handleReAllocate(student)}
                              style={{
                                padding: "6px 12px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              📝 Modify
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                          No students in this class
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Allocation Modal */}
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
            <h3 style={{ marginTop: 0 }}>Allocate Student to Class</h3>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              <strong>Student:</strong> {editingStudent?.user?.name}
            </p>

            <form onSubmit={handleSaveAllocation}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Class:</label>
                <input
                  type="text"
                  name="className"
                  value={allocationData.className}
                  onChange={handleAllocationFormChange}
                  placeholder="e.g., Class 10, 10th Grade, etc."
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
                <select
                  name="section"
                  value={allocationData.section}
                  onChange={handleAllocationFormChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">-- Select Section --</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Roll Number (Optional):</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={allocationData.rollNumber}
                  onChange={handleAllocationFormChange}
                  placeholder="e.g., 01"
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
                  {loading ? "Allocating..." : "Allocate"}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAllocation;