import React from 'react';


const NavbarInformation = (props) => {

    const tidbits = [
        "Squirrels can't burp",
        "Male Adelie penguins 'propose' to females by giving them a pebble",
        "Mountain lions can whistle",
        "Porcupines can float",
        "A grizzley bear can run as fast as a horse",
        "An airplane is proof that you can fly if you run fast enough",
        "If something is not true, false",
        "Everything in the universe is either blue or not blue",
    ]

    return (
        <ul className={"user-navbar-information"}>
            <li id= "information-title">Information</li>
            <hr className={"menu-line"}></hr> 
            {tidbits[Math.floor(Math.random() * tidbits.length)]}
            <hr className={"menu-line"}></hr> 
        </ul>
    )
}

export default NavbarInformation;