import React from "react";
import { Link } from "react-router-dom";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { provideIntlService } from "@progress/kendo-react-intl";
import "@progress/kendo-theme-default/dist/all.css";
import moment from "moment";

class EditMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: new Date(),
      end_time: new Date(),
      meeting: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.processResponse = this.processResponse.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/meetings/" + this.props.match.params.meetingId;
    fetch(url,{method: "GET"})
      .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
      .then((response) => this.setState({ meeting: response }))
      .catch((error) => {
        console.error(error);
        return { name: "network error", description: "" };
      });
  }
  processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then((res) => ({
      statusCode: res[0],
      data: res[1],
    }));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const url = "/api/v1/meetings/" + this.props.match.params.meetingId;
    const { start_time, end_time } = this.state;

    const body = {
      start_time,
      end_time,
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(this.processResponse)
      .then((res) => {
        const { statusCode, data } = res;
        console.log("data", data);
        if (data.status === 400) {
          console.log("statusCode", 400);
          console.log("errors", data.data.errors);
          window.alert(data.data.errors);
          throw new Error("Meeting not scheduled");
        } else {
          this.props.history.push("/meetings");
        }
      })
      .catch((error) => {
        console.error(error);
        return { name: "network error", description: "" };
      });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Update meeting</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input
                  type="datetime-local"
                  defaultValue={this.state.meeting.start_time}
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
                  defaultValue={this.state.meeting.end_time}
                  name="end_time"
                  id="end_time"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Confirm
              </button>
              <Link to="/meetings" className="btn btn-link mt-3">
                Back to all meetings
              </Link>

              <div className="card mt-3">
                <h3 className="font-weight-normal ml-4 mt-2 mb-0">Current timings</h3>
                   <div className="card-body">
                    <li className="list-group-item">
                      <strong>Start: </strong>
                      {moment.utc(this.state.meeting.start_time).format("MMMM Do YYYY, HH:mm")}
                    </li>

                    <li className="list-group-item">
                      <strong>End: </strong>
                      {moment.utc(this.state.meeting.end_time).format("MMMM Do YYYY, HH:mm")}
                    </li>
                  </div>
                </div>

            </form>

            

          </div>
          
        </div>
      </div>
    );
  }
}
export default EditMeeting;
