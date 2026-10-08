import { Link } from "react-router-dom";

function Announcements() {

  const announcements = [
    {
      id: 1,
      title: "New Training Schedule Released",
      date: "8 October 2026",
      type: "Training",
      icon: "🏋️",
      message:
        "The new training schedule for October has been released. Members can now check their upcoming training sessions."
    },
    {
      id: 2,
      title: "Sports Championship Registration Open",
      date: "7 October 2026",
      type: "Event",
      icon: "🏆",
      message:
        "Registration is now open for the Sports Championship 2026. Members are encouraged to register before the deadline."
    },
    {
      id: 3,
      title: "New Volleyball Training Session",
      date: "6 October 2026",
      type: "Training",
      icon: "🏐",
      message:
        "A new volleyball practice session has been added to the training schedule."
    },
    {
      id: 4,
      title: "Club Meeting This Weekend",
      date: "5 October 2026",
      type: "General",
      icon: "📢",
      message:
        "All SportsHub members are invited to attend the upcoming club meeting this weekend."
    },
    {
      id: 5,
      title: "Football Tournament Update",
      date: "3 October 2026",
      type: "Event",
      icon: "⚽",
      message:
        "The football tournament schedule and participating teams have been updated."
    }
  ];

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
              Announcements
            </h1>

            <p>
              Stay updated with the latest SportsHub news and updates.
            </p>

          </div>

          <Link to="/dashboard" className="back-button">
            ← Dashboard
          </Link>

        </div>


        <div className="announcement-list">

          {announcements.map((announcement) => (

            <div
              className="announcement-card"
              key={announcement.id}
            >

              <div className="announcement-icon">
                {announcement.icon}
              </div>

              <div className="announcement-content">

                <div className="announcement-top">

                  <span className="announcement-badge">
                    {announcement.type}
                  </span>

                  <span className="announcement-date">
                    {announcement.date}
                  </span>

                </div>

                <h2>
                  {announcement.title}
                </h2>

                <p>
                  {announcement.message}
                </p>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Announcements;
