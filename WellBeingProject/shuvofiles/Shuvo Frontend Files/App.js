import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { WorkoutPlan } from './workout_plan';
import { GeneratedPlan } from './generated_plan';
import { Navbar } from './navbar';
import { Workouts } from './Workouts';
import { Login } from './login';
import { AdminDashboard } from './admin_dashboard';
import { TrainerManagement } from './Trainer_Management';
import { WorkoutDashboard } from './workout_dashboard';
import { GeneratedPremadePlan } from './generated_premade_plan';
import { TrainerDashboard } from './trainer_dashboard';
import { EditWorkoutPlans } from './edit_workout_plan';
import { AddRemoveWorkoutTrainer } from './add_remove_workout_trainer';
import { useState, useEffect } from 'react';

function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* Redirect root path ("/") to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Define the routes for various components */}
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/trainer_dashboard" element={<TrainerDashboard />} />
        <Route path="/generated_plan" element={<GeneratedPlan />} />
        <Route path="/generated_premade_plan" element={<GeneratedPremadePlan />} />
        <Route path="/add_remove_workout_trainer" element={<AddRemoveWorkoutTrainer />} />
        <Route path="/edit_workout_plan" element={<EditWorkoutPlans />} />
        <Route path ="/trainer_dashboard/edit_workout_plan" element={<EditWorkoutPlans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workout_dashboard" element={<WorkoutDashboard />} />
        <Route path="/login/workout_plan" element={<WorkoutPlan />} />
        <Route path="/login/workout_plan/workouts" element={<Workouts />} />
        <Route path="/login/trainer_management" element={<TrainerManagement />} />
        {/* <Route path="/workout_plan" element={<WorkoutPlan />} /> */}
        <Route path="/login/workout_plan/generated_plan" element={<GeneratedPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
