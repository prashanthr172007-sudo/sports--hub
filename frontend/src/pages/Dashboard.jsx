import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userSport, setUserSport] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error || !user) {
      navigate("/login");
      return;
    }

    setUserEmail(user.email);

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, sport")
      .eq("id", user.id)
      .single();

    if (profile) {
      setUserName(profile.full_name);
      setUserSport(profile.sport);
    } else {
      setUserName(
        user.user_metadata?.full_name || "User"
      );

      setUserSport(
        user.user_metadata?.sport || "Not selected"
      );
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          Sports<span>Hub</span>
        </div>

        <div className="dashboard-nav">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/training">
            Training
          </Link>

          <Link to="/events">
            Events
          </Link>

          <Link to="/announcements">
            Announcements
          </Link>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* MAIN DASHBOARD */}

      <main className="dashboard-container">

        {/* WELCOME */}

        <section className="dashboard-welcome">

          <h1>
            Welcome, {userName || "User"} 👋
          </h1>

          <p>
            Manage your sports activities from your dashboard.
          </p>

        </section>


        {/* STAT CARDS */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              🏋️
            </div>

            <h3>
              Training Sessions
            </h3>

            <strong>
              4
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🏆
            </div>

            <h3>
              Upcoming Events
            </h3>

            <strong>
              3
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📝
            </div>

            <h3>
              Registered Events
            </h3>

            <strong>
              2
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📢
            </div>

            <h3>
              Announcements
            </h3>

            <strong>
              5
            </strong>

          </div>

        </section>


        {/* DASHBOARD SECTIONS */}

        <section className="dashboard-grid">


          {/* PROFILE */}

          <div className="dashboard-section">

            <h2>
              My Profile
            </h2>

            <div className="profile-box">

              <div className="profile-avatar">
                {userName
                  ? userName.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="profile-info">

                <h3>
                  {userName || "Loading..."}
                </h3>

                <p>
                  {userEmail || "Loading..."}
                </p>

                <p>
                  Sport: {userSport || "Loading..."}
                </p>

              </div>

            </div>

          </div>


          {/* TRAINING */}

          <div className="dashboard-section">

            <h2>
              Upcoming Training
            </h2>

            <div className="dashboard-list">

              <div className="dashboard-list-item">

                <h3>
                  🏏 Cricket Training
                </h3>

                <p>
                  Today • 5:00 PM
                </p>

              </div>


              <div className="dashboard-list-item">

                <h3>
                  🏐 Volleyball Practice
                </h3>

                <p>
                  Tomorrow • 6:00 PM
                </p>

              </div>

            </div>

          </div>


          {/* EVENTS */}

          <div className="dashboard-section">

            <h2>
              Upcoming Events
            </h2>

            <div className="dashboard-list">

              <div className="dashboard-list-item">

                <h3>
                  🏆 Sports Championship
                </h3>

                <p>
                  15 October 2026
                </p>

              </div>


              <div className="dashboard-list-item">

                <h3>
                  ⚽ Football Tournament
                </h3>

                <p>
                  20 October 2026
                </p>

              </div>

            </div>

          </div>


          {/* ANNOUNCEMENTS */}

          <div className="dashboard-section">

            <h2>
              Announcements
            </h2>

            <div className="dashboard-list">

              <div className="dashboard-list-item">

                <h3>
                  📢 New Training Schedule
                </h3>

                <p>
                  Check the latest training timetable.
                </p>

              </div>


              <div className="dashboard-list-item">

                <h3>
                  📢 Event Registration Open
                </h3>

                <p>
                  Registration is now available.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;