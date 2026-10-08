import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Training() {
  const navigate = useNavigate();

  const [joinedTrainings, setJoinedTrainings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");

  const trainingSessions = [
    {
      id: 1,
      sport: "Cricket",
      title: "Cricket Training",
      coach: "Coach Rahul",
      date: "Today",
      time: "5:00 PM - 7:00 PM",
      location: "Sports Ground A",
      level: "Intermediate"
    },
    {
      id: 2,
      sport: "Volleyball",
      title: "Volleyball Practice",
      coach: "Coach Arjun",
      date: "Tomorrow",
      time: "6:00 PM - 8:00 PM",
      location: "Indoor Court",
      level: "Beginner"
    },
    {
      id: 3,
      sport: "Football",
      title: "Football Training",
      coach: "Coach Kiran",
      date: "15 October",
      time: "4:30 PM - 6:30 PM",
      location: "Football Ground",
      level: "Advanced"
    },
    {
      id: 4,
      sport: "Badminton",
      title: "Badminton Practice",
      coach: "Coach Naveen",
      date: "16 October",
      time: "5:30 PM - 7:00 PM",
      location: "Badminton Court",
      level: "All Levels"
    }
  ];

  useEffect(() => {
    loadJoinedTrainings();
  }, []);

  async function loadJoinedTrainings() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("training_registrations")
      .select("training_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setJoinedTrainings(
        data.map((item) => item.training_id)
      );
    }
  }

  async function joinTraining(trainingId) {
    setLoadingId(trainingId);
    setMessage("");

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    if (joinedTrainings.includes(trainingId)) {
      setMessage("You have already joined this training session.");
      setLoadingId(null);
      return;
    }

    const { error } = await supabase
      .from("training_registrations")
      .insert([
        {
          user_id: user.id,
          training_id: trainingId
        }
      ]);

    if (error) {
      setMessage(error.message);
      setLoadingId(null);
      return;
    }

    setJoinedTrainings([
      ...joinedTrainings,
      trainingId
    ]);

    setMessage("Training session joined successfully!");

    setLoadingId(null);
  }

  return (
    <div className="dashboard-page">

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

        </div>

      </nav>


      <main className="page-container">

        <div className="page-header">

          <div>

            <h1>
              Training Sessions
            </h1>

            <p>
              View upcoming training sessions and improve your skills.
            </p>

          </div>

          <Link
            to="/dashboard"
            className="back-button"
          >
            ← Dashboard
          </Link>

        </div>


        {message && (
          <div className="action-message">
            {message}
          </div>
        )}


        <div className="training-grid">

          {trainingSessions.map((session) => (

            <div
              className="training-card"
              key={session.id}
            >

              <div className="training-icon">

                {session.sport === "Cricket" && "🏏"}
                {session.sport === "Volleyball" && "🏐"}
                {session.sport === "Football" && "⚽"}
                {session.sport === "Badminton" && "🏸"}

              </div>


              <div className="training-content">

                <span className="sport-badge">
                  {session.sport}
                </span>

                <h2>
                  {session.title}
                </h2>

                <p>
                  👨‍🏫 {session.coach}
                </p>

                <p>
                  📅 {session.date}
                </p>

                <p>
                  ⏰ {session.time}
                </p>

                <p>
                  📍 {session.location}
                </p>

                <p>
                  🎯 Level: {session.level}
                </p>


                <button
                  className="join-button"
                  onClick={() => joinTraining(session.id)}
                  disabled={loadingId === session.id}
                >

                  {loadingId === session.id
                    ? "Joining..."
                    : joinedTrainings.includes(session.id)
                    ? "Joined ✓"
                    : "Join Training"}

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Training;