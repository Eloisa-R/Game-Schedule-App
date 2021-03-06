import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter
} from "react-router-dom";

class Locations extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  }
        displayMaps() {
        var chosen_location = this.props.match.params.id
        var location_names = [["AJ Katzenmeier Elementary","24 W. Walton St., Chicago, IL 60610", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6542135621644!2d-87.63124374851964!3d41.90029307911839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24+W+Walton+St%2C+Chicago%2C+IL+60610%2C+EE.+UU.!5e0!3m2!1ses!2sde!4v1519034324500"], ["Greenbay Elementary","1734 N. Orleans St., Chicago, IL 60614", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.0258285528175!2d-87.64003404851931!3d41.913803479117476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34073f306a3%3A0x9e1726bbf8f23f0e!2s1734+N+Orleans+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses!2sde!4v1519034743780"], ["Howard A Yeager Elementary", "2245 N. Southport Ave., Chicago, IL 60614", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.5856830903645!2d-87.66511994851908!3d41.92326457911664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f9b8d2d%3A0x62ad8b907dd755d6!2s2245+N+Southport+Ave%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses!2sde!4v1519034900869"], ["Marjorie P Hart Elementary", "2625 N. Orchard St., Chicago, IL 60614", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.291821600006!2d-87.64809034851898!3d41.92958027911627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2630e551%3A0x3e719e44a5cef714!2s2625+N+Orchard+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses!2sde!4v1519034954410"], ["North Elementary", "1409 N. Ogden Ave., Chicago, IL 60610", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.33648823633!2d-87.64836124851949!3d41.90712467911789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af13a8945%3A0xb6ad1ec2b6f379ba!2s1409+N+Ogden+Ave%2C+Chicago%2C+IL+60610%2C+EE.+UU.!5e0!3m2!1ses!2sde!4v1519035016911"], ["South Elementary","2101 N. Fremont St., Chicago, IL 60614", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.7480203138834!2d-87.65356324851916!3d41.91977527911704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3196fb41dc7%3A0x970be7f7d6336df5!2s2101+N+Fremont+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses!2sde!4v1519035059902"]];
        var map_chosen = location_names.filter(element => element[0].toUpperCase().includes(chosen_location))
        return <div className="map container"><h3>{map_chosen[0][0]}</h3><iframe title={map_chosen[0][0]} src={map_chosen[0][2]} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe></div>
      }

  render() {
    return (
      <HashRouter>
      <div className="locations-body-container"><div className="locations-body">
        <a className="back-button" onClick={this.context.router.history.goBack} >Back</a>
        {this.displayMaps()}
      </div></div>
      </HashRouter>
    );
  }
}

export default Locations;