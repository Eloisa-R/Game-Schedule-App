import React, { Component } from 'react';

class Calendar extends Component {
    
    displayCalendar() {
        return <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;hl=en&amp;bgcolor=%23FFFFFF&amp;src=p3bpcomi895snhkrt9dog1g0so%40group.calendar.google.com&amp;color=%230F4B38&amp;ctz=Europe%2FMadrid" width="80%" height="65%" frameBorder="0" scrolling="no"></iframe>
    }
  render() {
    return (
      <div className="calendar-body">
        {this.displayCalendar()}
      </div>
    );
  }
}

export default  Calendar;