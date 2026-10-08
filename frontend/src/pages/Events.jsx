import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Events() {
  const navigate = useNavigate();

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");

  const events = [
    {
      id: 1,
      title: "Sports Championship 2026",
      sport: "Multiple Sports",
      date: "15 October 2026",
      time: "9:00 AM",
      location: "Main Sports Ground",
      description:
        "Annual sports championship featuring multiple sports and exciting competitions.",
      participants: "150+"
    },
    {
      id: 2,
      title: "Football Tournament",
      sport: "Football",
      date: "20 October 2026",
      time: "10:00 AM",
      location: "Football Ground",
      description:
        "Inter-club football tournament for registered SportsHub members.",
      participants: "80+"
    },
    {
      id: 3,
      title: "Cricket League",
      sport: "Cricket",
      date: "25 October 2026",
      time: "8:00 AM",
      location: "Cricket Ground",
      description:
        "Exciting cricket league with teams competing for the championship trophy.",
      participants: "100+"
    },
    {
      id: 4,
      title: "Badminton Open",
      sport: "Badminton",
      date: "30 October 2026",
      time: "9:30 AM",
      location: "Indoor Court",
      description:
        "Open badminton competition for beginners and experienced players.",
      participants: "50+"
    }
  ];

  useEffect(() => {
    loadRegisteredEvents();
  }, []);

  async function loadRegisteredEvents() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("event_registrations")
      .select("event_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setRegisteredEvents(
        data.map((item) => item.event_id)
      );
    }
  }

  async function registerEvent(eventId) {
    setLoadingId(eventId);
    setMessage("");

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    if (registeredEvents.includes(eventId)) {
      setMessage("You have already registered for this event.");
      setLoadingId(null);
      return;
    }

    const { error } = await supabase
      .from("event_registrations")
      .insert([
        {
          user_id: user.id,
          event_id: eventId
        }
      ]);

    if (error) {
      setMessage(error.message);
      setLoadingId(null);
      return;
    }

    setRegisteredEvents([
      ...registeredEvents,
      eventId
    ]);

    setMessage("Event registration successful!");

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
              Sports Events
            </h1>

            <p>
              Discover upcoming competitions and register for events.
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


        <div className="events-grid">

          {events.map((event) => (

            <div
              className="event-card"
              key={event.id}
            >

              <div className="event-banner">

                {event.sport === "Football" && "⚽"}
                {event.sport === "Cricket" && "🏏"}
                {event.sport === "Badminton" && "🏸"}
                {event.sport === "Multiple Sports" && "🏆"}

              </div>


              <div className="event-content">

                <span className="event-badge">
                  {event.sport}
                </span>

                <h2>
                  {event.title}
                </h2>

                <p className="event-description">
                  {event.description}
                </p>


                <div className="event-details">

                  <p>
                    📅 {event.date}
                  </p>

                  <p>
                    ⏰ {event.time}
                  </p>

                  <p>
                    📍 {event.location}
                  </p>

                  <p>
                    👥 {event.participants} Participants
                  </p>

                </div>


                <button
                  className="register-button"
                  onClick={() => registerEvent(event.id)}
                  disabled={loadingId === event.id}
                >

                  {loadingId === event.id
                    ? "Registering..."
                    : registeredEvents.includes(event.id)
                    ? "Registered ✓"
                    : "Register Now"}

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Events;
