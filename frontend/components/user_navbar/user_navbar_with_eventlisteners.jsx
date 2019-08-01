import React from 'react';
import { Link } from 'react-router-dom';
import UserOptionsMenu from './user_options_menu'


export default class UserNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "form-visible": false,
      "primary-form": "user-options"
    };
    this.user_options = "user-options";
    this.create_board_options = "create-board-options";
    this.information = "information";
    this.notifications = "notifications";
    this.hideForm = this.hideForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false)
  }


  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false)
  }

  handleClick(e) {
    const allowedClicks = ["BUTTON", "LI", "LINK", "I", "A"]
    if (!allowedClicks.includes(e.target.nodeName)) {
      this.hideForm();
    }
  }

  showDropdown() { }

  showForm(field) {
    return () => {
      if (!this.state["form-visible"]) {
        this.setState(
          {
            "form-visible": true,
            "primary-form": field
          }
        )
      } else if (this.state["primary-form"] === field) {
        this.setState(
          { "form-visible": !this.state["form-visible"] }
        )
      } else {
        this.setState(
          { "primary-form": field }
        )
      }
    }
  }

  hideForm() {
    this.setState(
      { "form-visible": false }
    )
  }

  render() {
    let form;
    if (this.state["form-visible"]) {
      switch (this.state["primary-form"]) {
        case this.user_options:
          form = <UserOptionsMenu />
        // case this.create_board_options:
        // case this.notifications:
        // case this.information:
        default:
          form
      }
    }

    return (
      <section className={"user-navbar"}>
        <div className={"float-left"}>
          <Link to="/" className={"home-btn"}><i className="fas fa-home"></i></Link>
          <button className={"boards-btn"}><i className="fas fa-list"></i>  Boards</button>
          <input /*onBlur={implemement once building the container and internal state with handler helper methods}*/ className={"searchbar"} type="text" />
        </div>
        <div className={"float-middle"}>
          <Link to="/" className={"logo"}>Extralo</Link>
        </div>
        <div className={"float-right"}>
          <button onClick={this.showForm("create-board-options")} className={"create-board-btn"}><i className="fas fa-plus"></i></button>
          <button onClick={this.showForm("information")} className={"information-btn"}><i className="fas fa-info-circle"></i></button>
          <button onClick={this.showForm("notifications")} className={"notification-btn"}><i className="far fa-bell"></i></button>
          <button onClick={this.showForm("user-options")} id={"user-options-btn"}>M</button>
        </div>
        {form}
      </section>
    )
  }
}