import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function EchoAI() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    prompt: '',
    image: null,
  });

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: file });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    setTimeout(() => {
      let output = '';

      if (formData.title || formData.subtitle || formData.image) {
        output = `Generated Blog Content:
Title: ${formData.title}
Subtitle: ${formData.subtitle}
${formData.image ? 'Image uploaded and analyzed.' : ''}`;
      } else if (formData.prompt) {
        output = `AI Response:\n"${formData.prompt}"`;
      } else {
        output = 'Please provide title, subtitle, image, or prompt.';
      }

      setResponse(output);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] kode-mono-fontStyle text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 flex flex-col space-y-6">
        <h2 className="text-2xl font-bold text-center">EchoAI Content Generator</h2>

        <form
          onSubmit={handleGenerate}
          className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-white/70">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="mt-1 block w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/70">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter blog subtitle"
              className="mt-1 block w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/70">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-gray-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white/70">Prompt / Description</label>
            <textarea
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Or write a simple prompt for AI"
              className="mt-1 block w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white font-semibold rounded-lg bg-cyan-900 hover:bg-cyan-800 transition"
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
        </form>

        {response && (
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow">
            <h3 className="text-lg font-bold mb-2 text-white/90">AI Generated Content:</h3>
            <p className="whitespace-pre-line text-gray-200">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EchoAI;
