import React from 'react';
import { Link } from 'react-router-dom';


export default class Splashpage extends React.Component {
  render(){
    return(
      <section className={"splashpage"}>
        <div className={"splash-blurb-background"}>
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
              <div className={"blurb-demo"}>
                <button onClick={this.props.demoLogin}>Take a tour!</button>
              </div>
            </div>
            <div className={"blurb-img"}>
              <img 
                src="https://cdn.pixabay.com/photo/2016/10/23/17/06/calendar-1763587_960_720.png" 
                alt="Calendar graphic">
              </img>
            </div>
          </section>
        </div>
        <section className={"splash-content"}>
          <div className={"splash-content-1"}>
            <div className={"left-content"}>
              <div className={"splash-content-text"}>
                 <div className={"large-text"}>
                    Work with any team - including a team of one!
                 </div>
                 <div className={"med-text"}>
                    Extralo makes it easy to collaborate with others by providing a single, in-sync, source of planning.
                 </div>
              </div>
            </div>
            <div className={"right-content"}>
              <img 
                src="https://cdn.pixabay.com/photo/2017/05/09/13/33/laptop-2298286_960_720.png" 
                alt="Work desk">

              </img>
            </div>
          </div>
          <div className={"splash-content-2"}>
            <div className={"left-content"}>
              <img 
                src="https://cdn.pixabay.com/photo/2016/10/16/16/33/dual-screen-1745705_960_720.png" 
                alt="Dual-screens for programming">
                
              </img>            
            </div>
            <div className={"right-content"}>
              <div className={"splash-content-text"}>
                <div className={"large-text"}>
                  Track metrics, schedule meetings, and highlight code snippets all from one place!
                 </div>
                <div className={"med-text"}>
                  With simple calendar integrations, powerful planning templates, and a deep respect for Agile principles, Extralo knows what's worth prioritizing and what's worth offloading
                </div>
              </div>
            </div>
          </div>
          <div className={"splash-content-3"}>
            <div className={"left-content"}>
              <div className={"splash-content-text"}>
                <div className={"large-text"}>
                  Intuitively rearrange EVERYTHING
                 </div>
                <div className={"med-text"}>
                  Oh something needs to change? (Of course it does).
                  Don't let yourself waste time figuring out how to make it happen.
                </div>
              </div>
            </div>
            <div className={"right-content"}>
              <img 
                src="https://cdn.pixabay.com/photo/2016/09/11/05/34/whatsapp-interface-1660652_960_720.png" 
                alt="Whats App interface">

              </img>
            </div>
          </div>
          <div className={"splash-content-4"}>
            <div className={"middle-content"}>
              <div className={"blurb-signup"}>
                <Link to={"/signup"}>Get Started!</Link>
              </div>
            </div>
          </div>
        </section>
        <img 
          className={"bottom-img"} 
          src="https://cdn.pixabay.com/photo/2018/03/28/21/49/mountains-3270710_960_720.png"
          alt="Mountain silhouettes"> 
        </img>
      </section>
    )
  }
}