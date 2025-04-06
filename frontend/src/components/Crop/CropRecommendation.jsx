import React, { useState } from "react";
import axios from "axios";

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const requestData = {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      };
  
      console.log("🚀 Sending data:", requestData); // Debug request data
  
      const response = await axios.post("http://127.0.0.1:5000/predict", requestData);
      setResult(response.data.crop);
    } catch (err) {
      console.error("❌ Error:", err.response ? err.response.data : err.message); // Log error
      setError("Error making prediction. Please check your inputs.");
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold mb-4">Crop Recommendation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Get Recommendation
        </button>
      </form>
      {result && <p className="mt-4 text-green-500 font-semibold">Recommended Crop: {result}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CropRecommendation;
