import React, { useState, useEffect } from "react";
import MainComponentArea from "../components/MainComponentArea";
import Sidebar from "../components/Sidebar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const toggleBtn = document.getElementById('sidebar-toggle');
      
      if (isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target) && 
          toggleBtn && 
          !toggleBtn.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Toggle Button for Mobile */}
      <button
        id="sidebar-toggle"
        className="lg:hidden fixed top-20 left-4 z-50 bg-black/10 p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r  transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:w-64`}
      >
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-grow lg:pl-0 pt-16">
        <div className="p-4 lg:pl-6">
          <MainComponentArea
            components={posts.length > 0 ? posts : sampleComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;