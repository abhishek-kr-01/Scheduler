import React from "react";
import { Link } from "react-router-dom";
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { provideIntlService } from '@progress/kendo-react-intl';
import '@progress/kendo-theme-default/dist/all.css';
import moment from "moment";

class NewMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: new Date(),
      end_time: new Date(),
      candidate_id: "",
      recruiter_id: "",
      users: [],
      candidates: [],
      recruiters: [],
      res: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.processResponse = this.processResponse.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ users: response }))
      .then((data) => {
        let rec = this.state.users.filter((user) => {
          return user.role_id !== 1;
        });
        let can = this.state.users.filter((user) => {
          return user.role_id !== 2;
        });
        this.setState((state) => {
          state.candidates = can;
          state.recruiters = rec;
          return state;
        });
      })
      .catch(() => this.props.history.push("/"));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  processResponse (response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }

  onSubmit(event) {
    event.preventDefault();

    const url = "/api/v1/meetings/create";
    const { start_time, end_time, candidate_id, recruiter_id } = this.state;

    if (
      start_time.length == 0 ||
      end_time.length == 0 ||
      candidate_id.length == 0
    )
      return;

    const body = {
      start_time,
      end_time,
      candidate_id,
      recruiter_id,
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    .then(this.processResponse)
    .then(res => {
        const { statusCode, data } = res;
        console.log("data",data);
        if(data.status===400){
          console.log("statusCode", 400);
          console.log("errors", data.data.errors);
          window.alert(data.data.errors);
          throw new Error( "Meeting not scheduled" )
        }
        else{
          this.props.history.push("/meetings");
        }
    }) 
    .catch(error => {
          console.error(error);
          return { name: "network error", description: "" };
      });
  }
  
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Schedule a meeting</h1>

            <form onSubmit={this.onSubmit}>


              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input
                  type = "datetime-local"
                  name="start_time"
                  id="start_time"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  id="end_time"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Select candidate:
                  <select
                    defaultValue = {'DEFAULT'}
                    type="dropdown"
                    name="candidate_id"
                    id="candidate_id"
                    className="form-control"
                    onChange={this.onChange}
                  >
                  <option value="DEFAULT" disabled>Select...</option>
                    {this.state.candidates.map((candidate) => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name + " ---> " + candidate.email}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-group">
                <label>
                  Select recruiter:
                  <select
                    defaultValue = {'DEFAULT'}
                    name="recruiter_id"
                    id="recruiter_id"
                    className="form-control"
                    onChange={this.onChange}
                  >
                  <option value="DEFAULT" disabled>Select...</option>
                    {this.state.recruiters.map((recruiter) => (
                      <option key={recruiter.id} value={recruiter.id}>
                        {recruiter.name + " ---> " + recruiter.email}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="btn custom-button mt-3">
                Confirm Meeting
              </button>
              <Link to="/meetings" className="btn btn-link mt-3">
                Back to all meetings
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewMeeting;
