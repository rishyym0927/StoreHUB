import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import Register from "./pages/Register";
import ComponentDetailPage from "./pages/ComponentDetailPage";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFound";
import UnauthorizedPage from "./pages/Unauth";
import PostCreatePage from "./pages/CreatePost";

import ProtectedRoute from "./components/ProtectedRoute";

import Trending from "./pages/Trending";
import ForgotPasswordPage from "./pages/ForgotPassword";
import SandboxCreate from "./components/SandboxCreate";
import Sandbox from "./pages/Sandbox";
import SandboxDetail from "./pages/SandboxDetail";
import DiscussionApp from "./pages/Discussion";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Routes with Layout */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <ComponentDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="sandbox-create"
              element={
                <ProtectedRoute>
                  <SandboxCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="sandbox"
              element={
                <ProtectedRoute>
                  <Sandbox />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <PostCreatePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sandbox/:id"
              element={
                <ProtectedRoute>
                  <SandboxDetail />
                </ProtectedRoute>
              }
            />
             <Route
              path="/discussion"
              element={
                <ProtectedRoute>
                  <DiscussionApp />
                </ProtectedRoute>
              }
            />
          </Route>

       
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="/unauth" element={<UnauthorizedPage />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />

   
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
