import React, { useState, useEffect } from "react";
import {
  Code,
  Copy,
  Download,
  Star,
  ThumbsUp,
  ThumbsDown,
  Share2,
  GitBranch,
  UserCircle2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import Navbar from "../components/Navbar";
import apiClient from "../utils/apiClient";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ComponentDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [componentData, setComponentData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    // Fetch component details
    const fetchComponentData = async () => {
      try {
        const response = await apiClient.get(`/posts/${id}`);
        setComponentData(response.data);
      } catch (error) {
        console.error("Error fetching component data:", error);
      }
    };
    fetchComponentData();
  }, [id]);

  useEffect(() => {
    // Fetch comments
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`/comments/${id}`);
        setCommentData(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id, newComment]);

  if (!componentData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-black/70">Loading component...</p>
        </div>
      </div>
    );
  }

  const handleImageChange = (direction) => {
    if (!componentData?.images?.length) return;
    setCurrentImageIndex((prevIndex) => {
      if (direction === "next") {
        return (prevIndex + 1) % componentData.images.length;
      } else {
        return prevIndex === 0
          ? componentData.images.length - 1
          : prevIndex - 1;
      }
    });
  };

  const handlePostComment = async () => {
    if (newComment.trim()) {
      try {
        await apiClient.post(`/comments/${id}`, { content: newComment });
        setNewComment("");
      } catch (error) {
        console.error("Error posting comment:", error);
        alert("Failed to post comment. Try again.");
      }
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
    // You would add API call here to update likes
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
    // You would add API call here to update dislikes
  };

  const TabButton = ({ tab, label, icon }) => (
    <button
      className={`flex items-center px-5 py-3 text-sm transition-colors ${
        activeTab === tab
          ? "border-b-2 border-black text-black font-medium"
          : "border-transparent text-black/60 hover:text-black hover:bg-black/5"
      }`}
      onClick={() => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
      }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5">
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-black/70">{componentData.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  icon: <GitBranch size={18} />, 
                  label: "Framework", 
                  value: componentData.framework 
                },
                { 
                  icon: <Code size={18} />, 
                  label: "Component Type", 
                  value: componentData.componentType 
                },
                { 
                  icon: <UserCircle2 size={18} />, 
                  label: "Author", 
                  value: componentData?.user?.username || "Anonymous" 
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-black/5">
                  <h4 className="font-medium flex items-center text-sm text-black/70 mb-1">
                    {item.icon} 
                    <span className="ml-2">{item.label}</span>
                  </h4>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "code":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
            <div className="bg-black/5 p-3 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-black/70 hover:text-black p-1 rounded transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(componentData.codeSnippet);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? "Copied!" : <Copy size={16} />}
                </button>
                <button className="text-black/70 hover:text-black p-1 rounded transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <pre className="bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{componentData.codeSnippet}</code>
            </pre>
          </div>
        );
      case "comments":
        return (
          <div className="space-y-5">
            <div className="flex space-x-3 bg-white rounded-xl p-4 shadow-sm border border-black/5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <UserCircle2 size={24} className="text-black/50" />
                </div>
              </div>
              <div className="flex-grow">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full border border-black/10 rounded-lg p-3 text-sm focus:ring-1 focus:ring-black focus:outline-none resize-none min-h-[80px]"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-colors"
                    onClick={handlePostComment}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
              <h3 className="font-medium text-lg p-4 border-b border-black/5">
                Comments {commentData?.comments?.length > 0 && `(${commentData.comments.length})`}
              </h3>
              
              <div className="max-h-[500px] overflow-y-auto p-2">
                {commentData?.comments?.length > 0 ? (
                  commentData.comments.map((comment, index) => (
                    <div key={index} className="p-3 hover:bg-black/5 rounded-lg transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                            <UserCircle2 size={20} className="text-black/50" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <p className="font-medium text-sm">
                              {comment.User.Username}
                            </p>
                            <span className="mx-2 text-xs text-black/30">•</span>
                            <p className="text-xs text-black/50">
                              {new Date(comment.CreatedAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <p className="text-sm text-black/80">{comment.Content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-black/50">
                    <MessageCircle className="mx-auto mb-2" size={24} />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black/5 min-h-screen pt-16 pb-10">
        <div className="container mx-auto px-4 py-6">
          {/* Header and Mobile Menu Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold truncate pr-4">
              {componentData.title}
            </h1>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-white rounded-lg shadow-sm"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Tab Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white rounded-xl shadow-sm mb-5 overflow-hidden">
              <TabButton 
                tab="overview" 
                label="Overview" 
                icon={<GitBranch size={16} />} 
              />
              <TabButton 
                tab="code" 
                label="Code" 
                icon={<Code size={16} />} 
              />
              <TabButton 
                tab="comments" 
                label="Comments" 
                icon={<MessageCircle size={16} />} 
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column (Image & Actions) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Image Carousel */}
              <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                <div className="relative aspect-video bg-black/5">
                  {componentData.images?.length > 0 ? (
                    <>
                      <img
                        src={componentData.images[currentImageIndex]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      {componentData.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageChange("prev")}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handleImageChange("next")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-black/40">
                      <span>No images available</span>
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {componentData.images?.length > 1 && (
                  <div className="flex overflow-x-auto p-2 space-x-2">
                    {componentData.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden
                          ${currentImageIndex === idx ? 'ring-2 ring-black' : 'opacity-70'}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-4">
                <div className="flex flex-wrap gap-3 justify-between">
                  <div className="flex space-x-3">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                        isLiked 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black/70 border-black/10 hover:border-black/30'
                      }`}
                    >
                      <ThumbsUp size={16} />
                      <span>{componentData.likes}</span>
                    </button>
                    
                    <button
                      onClick={handleDislike}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                        isDisliked 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black/70 border-black/10 hover:border-black/30'
                      }`}
                    >
                      <ThumbsDown size={16} />
                      <span>{componentData.dislikes}</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-black/10 bg-white text-black/70 hover:border-black/30 transition-colors">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-black/10 bg-white text-black/70 hover:border-black/30 transition-colors">
                      <Star size={16} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Card - Mobile Only */}
              <div className="bg-white rounded-xl shadow-sm border border-black/5 p-4 flex items-center space-x-3 lg:hidden">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                  <UserCircle2 size={28} className="text-black/50" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {componentData?.user?.username || "Anonymous"}
                  </h3>
                  <p className="text-sm text-black/60">Component Author</p>
                </div>
                <Link to={`/profile/${componentData?.user?.id}`} className="ml-auto">
                  <button className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-black/10 text-sm hover:border-black/30 transition-colors">
                    <span>Profile</span>
                    <ExternalLink size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column (Tabs & Content) */}
            <div className="lg:col-span-3 space-y-5">
              {/* Desktop Tab Navigation */}
              <div className="hidden md:flex bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                <TabButton 
                  tab="overview" 
                  label="Overview" 
                  icon={<GitBranch size={18} />} 
                />
                <TabButton 
                  tab="code" 
                  label="Code" 
                  icon={<Code size={18} />} 
                />
                <TabButton 
                  tab="comments" 
                  label="Comments" 
                  icon={<MessageCircle size={18} />} 
                />
              </div>

              {/* Author Card - Desktop Only */}
              <div className="hidden lg:flex bg-white rounded-xl shadow-sm border border-black/5 p-4 items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
                  <UserCircle2 size={28} className="text-black/50" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {componentData?.user?.username || "Anonymous"}
                  </h3>
                  <p className="text-sm text-black/60">Component Author</p>
                </div>
                <Link to={`/profile/${componentData?.user?.id}`} className="ml-auto">
                  <button className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-black/10 text-sm hover:border-black/30 transition-colors">
                    <span>Profile</span>
                    <ExternalLink size={14} />
                  </button>
                </Link>
              </div>

              {/* Tab Content */}
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentDetailPage;