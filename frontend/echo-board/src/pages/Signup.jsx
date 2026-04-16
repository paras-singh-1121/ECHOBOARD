import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup Data:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="kode-mono-fontStyle flex min-h-screen justify-center items-center ">
      <div className="sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl shadow-lg"
          style={{ backgroundColor: "white", border: "2px solid #e0e0e0" }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sky-600">Create your account</h2>
            <p className="text-gray-700 mt-1">Join EchoBoard and start echoing your thoughts.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-cyan-900">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-cyan-900">Password</label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create password"
                onChange={handleChange}
                className="block w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-cyan-900">Confirm Password</label>
            <div className="relative mt-1">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Re-enter password"
                onChange={handleChange}
                className="block w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-lg bg-cyan-900 hover:bg-cyan-800 transition"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-gray-700">
            Already have an account?{" "}
                 <Link to="/login" className="font-semibold text-sky-600 hover:text-cyan-900">
                          Sign in
                 </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
