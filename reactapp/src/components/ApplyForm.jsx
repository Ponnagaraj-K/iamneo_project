import React, { useState } from "react";
import "./ApplyForm.css"; // <-- connect CSS here

// Hardcoded backend URL
const API_BASE =
  "https://ide-cdaebefafaeedecddaabafefccfecdeabcadecaab.premiumproject.examly.io/proxy/8080";

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    bikeNumber: "",
    age: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.bikeNumber) newErrors.bikeNumber = "Bike Number is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/addBiketaxi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess("Your application has been submitted successfully!");
        setFormData({ name: "", bikeNumber: "", age: "", phoneNumber: "" });
        setErrors({});
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };


return (
<div className="apply-form-container">
<div className="apply-form-card">
<h2>Apply to Join</h2>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="name">Name:</label>
<input
id="name"
type="text"
value={formData.name}
onChange={(e) =>
setFormData({ ...formData, name: e.target.value })
}
/>
{errors.name && <p className="error">{errors.name}</p>}
</div>

<div className="form-group">
<label htmlFor="bikeNumber">Bike Number:</label>
<input
id="bikeNumber"
type="text"
value={formData.bikeNumber}
onChange={(e) =>
setFormData({ ...formData, bikeNumber: e.target.value })
}
/>
{errors.bikeNumber && (
<p className="error">{errors.bikeNumber}</p>
)}
</div>

<div className="form-group">
<label htmlFor="age">Age:</label>
<input
id="age"
type="number"
value={formData.age}
onChange={(e) =>
setFormData({ ...formData, age: e.target.value })
}
/>
{errors.age && <p className="error">{errors.age}</p>}
</div>

<div className="form-group">
<label htmlFor="phoneNumber">Phone Number:</label>
<input
id="phoneNumber"
type="text"
value={formData.phoneNumber}
onChange={(e) =>
setFormData({ ...formData, phoneNumber: e.target.value })
}
/>
{errors.phoneNumber && (
<p className="error">{errors.phoneNumber}</p>
)}
</div>

<button type="submit">Submit Application</button>
</form>
{success && <p className="success">{success}</p>}
</div>
</div>
);
}

export default ApplyForm;