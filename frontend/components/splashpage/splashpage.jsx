import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from './splashpage-assets/calendar';


export default class Splashpage extends React.Component {
  


  render(){
    return(
      <section className={"splashpage"}>
        <section className={"splash-blurb"}>
          <div className={"splash-blurb-text"}>
            <div className={"blurb-big-text"}>
              Extralo lets you use a week the way it was intended.
            </div>
            <div className={"blurb-small-text"}>
              Extralo is built around weeks, and its boards, lists, and cards help you organize in a way that feels exciting and intuitive.
            </div>
            <div className={"blurb-signup"}>
              <Link to={"/signup"}>Sign Up - It's Free!</Link>
            </div>
          </div>
          <div className={"blurb-img"}>
            <img src="https://cdn.pixabay.com/photo/2016/10/23/17/06/calendar-1763587_960_720.png" alt="Calendar graphic"></img>
          </div>
        </section>
        <section className={"splash-content"}>
          <div className={"splash-content-1"}>
            Content Section 1 - Scroll down to see a cool header transition.
          </div>
          <div className={"splash-content-2"}>
            Content Section 2 - see the it was cool

          </div>
          <div className={"splash-content-3"}>
            Content Section 3

          </div>
          <div className={"splash-content-4"}>
            Content Section 4

          </div>
        </section>
      </section>
    )
  }
}