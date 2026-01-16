import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./App.css";

// Image array (ensure these are in your public/images folder or use URLs)
const images = [
  {
    src: process.env.PUBLIC_URL + "/images/diet1.jpg",
    text: "Welcome to Healthy Living",
  },
  {
    src: process.env.PUBLIC_URL + "/images/diet2.jpg",
    text: "Customized Nutrition Plans",
  },
  {
    src: process.env.PUBLIC_URL + "/images/diet3.jpg",
    text: "Achieve Your Health Goals",
  },
];

const App = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    bmi: "",
    goal: "lose",
    dietType: "veg",
    healthConditions: [], // This will store an array of selected conditions
  });

  // Default diet plan data (generic)
  const defaultDietPlan = {
    name: "Generic Diet Plan",
    meals: [
      {
        time: "Morning",
        food: "Oatmeal with Almonds",
        calories: 250,
        protein: 10,
        carbs: 45,
        fat: 6,
      },
      {
        time: "Noon",
        food: "Grilled Chicken Salad",
        calories: 350,
        protein: 30,
        carbs: 20,
        fat: 15,
      },
      {
        time: "Afternoon",
        food: "Fruit Smoothie with Whey Protein",
        calories: 200,
        protein: 20,
        carbs: 30,
        fat: 5,
      },
      {
        time: "Night",
        food: "Baked Salmon with Quinoa",
        calories: 400,
        protein: 35,
        carbs: 40,
        fat: 18,
      },
    ],
  };

  // Set a default diet plan (generic one)
  const [dietPlan, setDietPlan] = useState(defaultDietPlan);

  // Diet plan example function (generates default diet plan)
  const generateDietPlan = () => {
    setDietPlan(defaultDietPlan); // Set the default plan (this can be expanded based on the form inputs)
  };

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHealthConditionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newHealthConditions = checked
        ? [...prevState.healthConditions, value]
        : prevState.healthConditions.filter((condition) => condition !== value);

      return {
        ...prevState,
        healthConditions: newHealthConditions,
      };
    });
  };

  return (
    <div className="App">
      {/* Image Slider */}
      <div className="image-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-image-container ${
              index === imageIndex ? "active" : ""
            }`}
          >
            <img src={image.src} alt="Diet-related" className="slider-image" />
            <div className="image-text">{image.text}</div>
          </div>
        ))}
      </div>

      {/* Diet Plan Form */}
      <div className="form-container">
        <h2>Create Your Diet Plan</h2>

        <label>
          BMI:
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleInputChange}
            placeholder="Enter your BMI"
          />
        </label>

        <label>
          Goal:
          <select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          >
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </label>

        <label>
          Diet Type:
          <select
            name="dietType"
            value={formData.dietType}
            onChange={handleInputChange}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </label>

        <div className="health-condition">
          <p>Select Health Condition:</p>
          <div className="checkbox-container">
            <div className="checkbox-item">
              <label>
                Diabetes
                <input
                  type="checkbox"
                  value="Diabetes"
                  checked={formData.healthConditions.includes("Diabetes")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
            <div className="checkbox-item">
              <label>
                High Pressure
                <input
                  type="checkbox"
                  value="High Pressure"
                  checked={formData.healthConditions.includes("High Pressure")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
            <div className="checkbox-item">
              <label>
                Heart Problem
                <input
                  type="checkbox"
                  value="Heart Problem"
                  checked={formData.healthConditions.includes("Heart Problem")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
            <div className="checkbox-item">
              <label>
                None
                <input
                  type="checkbox"
                  value="None"
                  checked={formData.healthConditions.includes("None")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Link to Diet Plan page, passing dietPlan as state */}
        <Link
          to={{
            pathname: "/diet-plan",
            state: { dietPlan }, // Passing the dietPlan as state to the next page
          }}
        >
          <button onClick={generateDietPlan}>Generate Diet Plan</button>
        </Link>
      </div>
    </div>
  );
};

export default App;
