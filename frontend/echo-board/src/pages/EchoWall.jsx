import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CaptionHelper from "../components/EchoAI/CaptionHelper";

// 🔥 Time formatter
const formatTime = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diff = Math.floor((now - postDate) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return postDate.toLocaleDateString();
};

// 🔥 CLEAN PARSER (simple + stable)
const parsePost = (text) => {
  if (!text) return { title: "", subtitle: "", content: "" };

  let cleaned = text.split("AI Generated Content:")[0];
  cleaned = cleaned.replace(/Title:/g, "").trim();

  const lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return {
    title: lines[0] || "",
    subtitle: lines[1] || "",
    content: lines.slice(2).join("\n") || "",
  };
};

function EchoWall() {
  const [posts, setPosts] = useState([]);

  // ✅ AUTH SAFE
  const { user: currentUser } = useAuth() || {};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  // 🔥 DELETE POST
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white kode-mono-fontStyle">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          EchoWall
        </h1>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

          {posts.length === 0 ? (
            <p className="text-gray-400 text-center">
              No posts yet...
            </p>
          ) : (
            posts.map((post) => {
              const parsed = parsePost(post.text);

              // ✅ SAFE ID handling (IMPORTANT FIX)
              const postUserId =
                typeof post.user === "object"
                  ? post.user?._id
                  : post.user;

              const currentUserId = currentUser?._id;

              const isOwner =
                currentUserId &&
                postUserId &&
                String(postUserId) === String(currentUserId);

              return (
                <div
                  key={post._id}
                  className="break-inside-avoid mb-6 p-4 rounded-2xl 
                  bg-linear-to-br from-[#111827] to-[#1f2937]
                  border border-white/10 shadow-lg 
                  hover:shadow-cyan-500/20 hover:-translate-y-1 
                  transition duration-300"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-4">

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                        {post.user?.username?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {post.user?.username ||
                            post.user?.email?.split("@")[0] ||
                            "User"}
                        </span>

                        <span className="text-xs text-gray-400">
                          {formatTime(post.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* 🔥 DELETE BUTTON (ONLY OWNER) */}
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-400 hover:text-red-500 p-1 rounded-full transition"
                        title="Delete post"
                      >
                        🗑
                      </button>
                    )}
                  </div>

                  {/* CONTENT */}
                  {parsed.title && (
                    <h2 className="text-lg font-bold text-cyan-400 mb-1">
                      {parsed.title}
                    </h2>
                  )}

                  {parsed.subtitle && (
                    <p className="text-sm text-white mb-2">
                      {parsed.subtitle}
                    </p>
                  )}

                  {parsed.content && (
                    <p className="text-gray-300 text-sm whitespace-pre-line mb-3">
                      {parsed.content}
                    </p>
                  )}

                  {/* IMAGE */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full rounded-xl object-cover mt-2 
                      hover:scale-[1.02] transition"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EchoWall;