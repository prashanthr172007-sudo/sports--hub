import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <div className="logo">
          Sports<span>Hub</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/training">Training</Link>
          <Link to="/events">Events</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-button">
            Join Now
          </Link>
        </div>
      </nav>

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO SPORTSHUB
          </p>

          <h1>
            Manage Your Sports Club
            <span> Smarter.</span>
          </h1>

          <p className="hero-description">
            A centralized platform to manage members,
            training schedules, events and club communication
            from one place.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="primary-button">
              Get Started
            </Link>

            <Link to="/login" className="secondary-button">
              Member Login
            </Link>

          </div>

        </div>

        <div className="hero-card">

          <div className="sports-icon">
            🏆
          </div>

          <h2>Sports Club</h2>

          <p>
            Train • Compete • Connect
          </p>

          <div className="hero-stats">

            <div>
              <strong>250+</strong>
              <small>Members</small>
            </div>

            <div>
              <strong>15</strong>
              <small>Sports</small>
            </div>

            <div>
              <strong>32</strong>
              <small>Events</small>
            </div>

          </div>

        </div>

      </section>

      <section className="features">

        <h2>Everything Your Club Needs</h2>

        <p className="section-description">
          SportsHub brings your entire sports club together
          in one simple platform.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div>👥</div>
            <h3>Member Management</h3>
            <p>
              Manage member profiles, registrations
              and activities.
            </p>
          </div>

          <div className="feature-card">
            <div>🏋️</div>
            <h3>Training Schedules</h3>
            <p>
              Organize training sessions and track
              participation.
            </p>
          </div>

          <div className="feature-card">
            <div>🏆</div>
            <h3>Events & Competitions</h3>
            <p>
              Create events and allow members to
              register easily.
            </p>
          </div>

          <div className="feature-card">
            <div>📢</div>
            <h3>Club Communication</h3>
            <p>
              Share important announcements and
              updates instantly.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;