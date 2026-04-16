import React, { useState } from "react";

function EchoWall() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = (e) => {
    e.preventDefault();
    if (!text && !image) return;

    const newPost = {
      id: Date.now(),
      text,
      image: image ? URL.createObjectURL(image) : null,
    };

    setPosts([newPost, ...posts]);
    setText("");
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-[#0d1117] text-white kode-mono-fontStyle">

      <h1 className="text-3xl font-bold mb-6">EchoWall</h1>

      <form
        onSubmit={handlePost}
        className="w-full max-w-md p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow space-y-4"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full rounded-md bg-transparent border border-white/20 px-3 py-2 outline-none text-white placeholder-gray-400 focus:ring-1 focus:ring-cyan-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-300"
        />

        <button
          type="submit"
          className="w-full bg-cyan-900 text-white py-2 rounded-md font-semibold hover:bg-cyan-800 transition"
        >
          Post
        </button>
      </form>

      <div className="w-full max-w-md mt-6 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg shadow"
          >
            {post.text && (
              <p className="mb-2 kode-mono-fontStyle text-gray-200">{post.text}</p>
            )}

            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="max-w-full rounded-md mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EchoWall;
