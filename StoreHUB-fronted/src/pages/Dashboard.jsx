import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MainComponentArea from "../components/MainComponentArea";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Menu, X } from "lucide-react";
import apiClient from "../utils/apiClient";
const Dashboard = () => {
  const sampleComponents = [
    {
      image: "",
      title: "Modern Button Component",
      summary: "A sleek, responsive button with multiple variants",
      framework: "React",
      type: "Button",
      author: "John Doe",
      likes: 234,
      dislikes: 12,
    },
  ];

  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle Sidebar

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/posts");
        console.log("Fetched posts:", response.data);
        setPosts(response.data.posts); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed top-16 left-4 z-50 bg-black/10 p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:w-64`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className={`lg:ml-64 transition-all duration-300 p-4 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <MainComponentArea
          components={posts.length > 0 ? posts : sampleComponents}
        />
      </div>
    </div>
  );
};

export default Dashboard;
