import React, { useState } from 'react';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bikeNumber: '',
    age: '',
    phoneNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.bikeNumber.trim()) {
      newErrors.bikeNumber = 'Bike Number is required';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('https://ide-cdaebefafaeedecddaabafefccfecdeabcadecaab.premiumproject.examly.io/proxy/8080/addBiketaxi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          bikeNumber: formData.bikeNumber,
          age: parseInt(formData.age),
          phoneNumber: formData.phoneNumber
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          name: '',
          bikeNumber: '',
          age: '',
          phoneNumber: ''
        });
      } else {
        console.error('Error submitting application');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="apply-form-container">
      <h2>Apply to Join</h2>
      <form onSubmit={handleSubmit} className="apply-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bikeNumber">Bike Number:</label>
          <input
            type="text"
            id="bikeNumber"
            name="bikeNumber"
            value={formData.bikeNumber}
            onChange={handleChange}
            className={errors.bikeNumber ? 'error' : ''}
          />
          {errors.bikeNumber && <span className="error-message">{errors.bikeNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? 'error' : ''}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Success!</h3>
            <p>Your application has been submitted successfully!</p>
            <button onClick={closeModal} className="modal-btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForm;