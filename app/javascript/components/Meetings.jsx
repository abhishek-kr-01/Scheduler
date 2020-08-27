import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { provideIntlService } from "@progress/kendo-react-intl";
class Meetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meetings: [], users: [] };
  }

  componentDidMount() {
    Promise.all([fetch("/api/v1/meetings/index"), fetch("/api/v1/users/index")])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        this.setState({ meetings: res1, users: res2 });
        // console.log(res2);
      })
      .then((data) => {
        let all = this.state.meetings.filter((meeting) => {
          return moment(meeting.end_time) >= moment();
        });
        this.setState((state) => {
          state.meetings = all;
          return state;
        });
      })
      .catch(() => this.props.history.push("/"));
  }

  deleteMeeting = (id, e) => {
    // console.log('go to then');
    const url = `/api/v1/meetings/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // console.log('go to then');
        let all = this.state.meetings.filter((meeting) => {
          return id !== meeting.id;
        });
        this.setState((state) => {
          state.meetings = all;
          return state;
        });
        () => this.props.history.push("/meetings");
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const { meetings } = this.state;
    const scheduledMeetings = meetings.map((meeting, index) =>(
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-3">
          <div className="card-body">
            <div className="borderless">
              {this.state.users.map((user) =>
                user.id === meeting.candidate_id ? (
                  <div>
                    <li className="list-group-item">
                      <strong>Candidate: </strong>
                      {user.name}
                    </li>
                    <li className="list-group-item">
                      <strong>Email: </strong>
                      {user.email}
                    </li>
                  </div>
                ) : (
                  <h5 className="card-title">{}</h5>
                )
              )}
            </div>

            <div className="borderless">
              {this.state.users.map((user) =>
                user.id === meeting.recruiter_id ? (
                  <div>
                    <li className="list-group-item">
                      <strong>Recruiter: </strong>
                      {user.name}
                    </li>
                    <li className="list-group-item">
                      <strong>Email: </strong>
                      {user.email}
                    </li>
                  </div>
                ) : (
                  <h5 className="card-title">{}</h5>
                )
              )}
            </div>

            <div className="borderless">
              <li className="list-group-item">
                <strong>Start: </strong>
                {moment(meeting.start_time).format("MMMM Do YYYY, HH:mm")}
              </li>

              <li className="list-group-item">
                <strong>End: </strong>
                {moment(meeting.end_time).format("MMMM Do YYYY, HH:mm")}
              </li>
            </div>

            <Link to={`/meeting/${meeting.id}`} className="btn custom-button">
              Edit
            </Link>

            <button
              type="button"
              className="btn custom-button-danger"
              onClick={(e) => {
                if (window.confirm("Are you sure?")) {
                  this.deleteMeeting(meeting.id, e);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));

    const noMeeting = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No meetings. 
          <Link to="/meeting">  Schedule one</Link>
        </h4>
      </div>
    );

    return (
      <div className="">
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All meetings</h1>
            <p className="lead text-muted">Manage all your meetings</p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/meeting" className="btn custom-button">
                Schedule New Meeting
              </Link>
            </div>
            <div className="row">
              {meetings.length > 0 ? scheduledMeetings : noMeeting}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </div>
    );
  }
}
export default Meetings;
