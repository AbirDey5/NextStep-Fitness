// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
// import {Box} from '@mui/material';


// export const EditWorkoutPlans = () => {
//   const navigate = useNavigate(); // Correctly use navigate inside the component

//   const [selectedPlan, setSelectedPlan] = useState("");  // Plan selected by the user
//   const [plans, setPlans] = useState([]);  // State to hold fetched premade plans
  
//   // Fetch premade plans from the backend
//   const fetchPremadePlans = async () => {
//     const params = new URLSearchParams();
//     if (selectedPlan) params.append("plan", selectedPlan);

//     try {
//       const response = await fetch(`http://localhost:8080/api/consists_of?${params.toString()}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setPlans(data); // Store the fetched plans in the state
//     } catch (error) {
//       console.error("Error fetching premade plans:", error);
//     }
//   };

//   // Handle change in plan selection
//   const handlePlanChange = (event) => {
//     setSelectedPlan(event.target.value);
//   };

//   return (
//     <div>
      
//       <div className="container py-5">
        
        

//         {/* Premade Plans */}
//         <div>

//         <Box sx={{ mb: 4, mt:6, width: '100%', backgroundColor: '#d3d3d3db', p: 2, borderRadius: 2 }}>

//         <h1 className="text-center text-primary">Edit Workout Plans</h1>
//           </Box>

//           <div className="container mt-4">
//             <div className="p-4 border rounded" style={{ backgroundColor: "white" }}>
//               <h1 className="text-center mt-5" style={{ color: "grey" }}>
//                 Select Your Premade Plan
//               </h1>
//               <form>
//                 {/* Premade Plan Selection */}
//                 <label className="form-label fw-bold">
//                   1. Select your premade plan
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedPlan}
//                   onChange={handlePlanChange}
//                 >
//                   <option value="" disabled>
//                     None
//                   </option>
//                   <option value="Advanced_High-Intensity_Muscle_gain">
//                     Advanced - High Intensity & Muscle Gain
//                   </option>
//                   <option value="Advanced_High-Intensity_Muscle_loss">
//                     Advanced - High Intensity & Muscle Loss
//                   </option>
//                   <option value="Advanced_High-Intensity_Muscle_Maintain">
//                     Advanced - High Intensity & Muscle Maintain
//                   </option>
//                   <option value="Beginner-FullBody-Maintain_Weight">
//                     Beginner - Full Body & Maintain Weight
//                   </option>
//                   <option value="Beginner-FullBody-Weight_gain">
//                     Beginner - Full Body & Weight Gain
//                   </option>
//                   <option value="Beginner-FullBody-Weight_Looss">
//                     Beginner - Full Body & Weight Loss
//                   </option>
//                   <option value="Intermediate-Strength-Muscle_gain">
//                     Intermediate - Strength & Muscle Gain
//                   </option>
//                   <option value="Intermediate-Strength-Muscle_maintain">
//                     Intermediate - Strength & Muscle Maintain
//                   </option>
//                   <option value="Intermediate-Strength-WeightLoss">
//                     Intermediate - Strength & Weight Loss
//                   </option>
//                 </select>

//                 {/* Button to generate plan */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     fetchPremadePlans(); // Trigger the fetch when user selects an option
//                     // Navigate and pass the selected plan
//                     navigate("/add_remove_workout_trainer", {
//                       state: { selectedPlan },
//                     });
//                   }}
//                   className="btn btn-primary mt-3"
//                   disabled={!selectedPlan} // Disable the button if no plan is selected
//                 >
//                   Generate Plan
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditWorkoutPlans;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';

export const EditWorkoutPlans = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all workout plans from the backend on component mount
  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch("http://localhost:8080/api/trainer/workout-plans");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setWorkoutPlans(data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
        setError("Failed to load workout plans. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlans();
  }, []);

  // Handle change in plan selection
  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  // Format plan name for display (convert underscores/hyphens to spaces)
  const formatPlanName = (name) => {
    return name
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div>
      <div className="container py-5">
        <div>
          <Box sx={{ mb: 4, mt: 6, width: '100%', backgroundColor: '#d3d3d3db', p: 2, borderRadius: 2 }}>
            <h1 className="text-center text-primary">Edit Workout Plans</h1>
          </Box>

          <div className="container mt-4">
            <div className="p-4 border rounded" style={{ backgroundColor: "white" }}>
              <h1 className="text-center mt-5" style={{ color: "grey" }}>
                Select Your Workout Plan
              </h1>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              <form>
                <label className="form-label fw-bold">
                  1. Select your workout plan
                </label>
                
                <select
                  className="form-select"
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  disabled={loading}
                >
                  <option value="" disabled>
                    {loading ? "Loading workout plans..." : "Select a plan"}
                  </option>
                  
                  {workoutPlans.map((plan) => (
                    <option key={plan.workoutPlanName} value={plan.workoutPlanName}>
                      {formatPlanName(plan.workoutPlanName)}
                    </option>
                  ))}
                </select>

                {!loading && workoutPlans.length === 0 && !error && (
                  <p className="text-muted mt-2">No workout plans available.</p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    navigate("/add_remove_workout_trainer", {
                      state: { selectedPlan },
                    });
                  }}
                  className="btn btn-primary mt-3"
                  disabled={!selectedPlan || loading}
                >
                  Edit Plan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkoutPlans;