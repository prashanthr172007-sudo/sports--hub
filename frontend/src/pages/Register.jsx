import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    sport: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }


  async function handleRegister(e) {

    e.preventDefault();

    setLoading(true);
    setMessage("");


    const { data, error } =
      await supabase.auth.signUp({

        email: formData.email,

        password: formData.password

      });


    if (error) {

      setMessage(error.message);

      setLoading(false);

      return;
    }


    if (data.user) {

      const { error: profileError } =
        await supabase
          .from("profiles")
          .upsert(
            {
              id: data.user.id,
              full_name: formData.fullName,
              phone: formData.phone,
              sport: formData.sport,
              role: "member"
            },
            {
              onConflict: "id"
            }
          );


      if (profileError) {

        setMessage(profileError.message);

        setLoading(false);

        return;
      }
    }


    setMessage(
      "Registration successful!"
    );


    setTimeout(() => {

      navigate("/login");

    }, 1000);


    setLoading(false);
  }


  return (

    <div className="auth-page">

      <div className="auth-card register-card">

        <div className="auth-logo">
          Sports<span>Hub</span>
        </div>


        <h1>
          Create Account
        </h1>


        <p className="auth-subtitle">
          Join your sports club today.
        </p>


        <form onSubmit={handleRegister}>

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />


          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          <label>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />


          <label>
            Select Sport
          </label>

          <select
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
          >

            <option value="">
              Choose your sport
            </option>

            <option>
              Football
            </option>

            <option>
              Cricket
            </option>

            <option>
              Basketball
            </option>

            <option>
              Badminton
            </option>

            <option>
              Volleyball
            </option>

            <option>
              Tennis
            </option>

            <option>
              Athletics
            </option>

          </select>


          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />


          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {message && (

          <p className="auth-message">
            {message}
          </p>

        )}


        <p className="auth-footer">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>


        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Register;