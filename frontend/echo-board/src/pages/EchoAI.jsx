import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EchoAI() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    prompt: '',
    image: null,
  });

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: file });
  };

  // AI Generate
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    setTimeout(() => {
  let output = "";

  if (formData.prompt) {
    output = `AI Generated Content:\n${formData.prompt}`;
  }

  if (formData.title || formData.subtitle) {
    output += `\n\nTitle: ${formData.title}\n${formData.subtitle}`;
  }

  if (formData.image) {
    output += `\n[Image Included]`;
  }

  if (!output.trim()) {
    output = "Please provide some input.";
  }

  setResponse(output);
  setLoading(false);
}, 1000);
  };

  // ✅ REAL BACKEND POST
  const handlePost = async () => {
    try {
      setPosting(true);

      let finalContent = "";

// Always include manual content
if (formData.title) finalContent += `Title: ${formData.title}\n`;
if (formData.subtitle) finalContent += `${formData.subtitle}\n`;
if (formData.prompt) finalContent += `${formData.prompt}\n`;

// If AI response exists, append it instead of replacing
if (response) {
  finalContent += `\n${response}`;
}

      if (!finalContent.trim()) {
        alert("Nothing to post!");
        return;
      }

      const data = new FormData();
      data.append("text", finalContent);

      if (formData.image) {
        data.append("image", formData.image);
      }
      const token = localStorage.getItem("token");
      
      await axios.post("http://localhost:5000/api/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset
      setFormData({
        title: '',
        subtitle: '',
        prompt: '',
        image: null,
      });

      setResponse("");

      alert("Posted successfully 🚀");

      // 🔥 Redirect to EchoWall
      navigate("/echowall");

    } catch (error) {
      console.error(error);
      alert("Post failed ❌");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white kode-mono-fontStyle">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          EchoAI Content Generator
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleGenerate}
          className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow space-y-4"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/20"
          />

          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/20"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <textarea
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            placeholder="Prompt or write directly..."
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/20"
          />

          <button
            type="submit"
            className="w-full py-2 bg-cyan-900 rounded-lg"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {/* AI OUTPUT */}
        {response && (
          <div className="p-4 border border-white/10 rounded-lg bg-white/5">
            <p className="whitespace-pre-line">{response}</p>
          </div>
        )}

        {/* POST BUTTON */}
        {(response || formData.title || formData.prompt) && (
          <button
            onClick={handlePost}
            disabled={posting}
            className="w-full py-3 bg-green-700 rounded-lg font-semibold hover:bg-green-600"
          >
            {posting ? 'Posting...' : 'Post to EchoWall 🚀'}
          </button>
        )}
      </div>
    </div>
  );
}

export default EchoAI;