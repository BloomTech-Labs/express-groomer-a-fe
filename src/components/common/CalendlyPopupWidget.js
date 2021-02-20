import React from 'react';
import { PopupWidget } from 'react-calendly';
import '../search/SearchResults/GroomerPublicProfile.scss';

// this component will render the calendly scheduler
// it needs to be passed a schedule link as props
// this comes from the groomer information as:
// groomerInfo.personal_calendly_link
const CalendlyPopupWidget = ({ scheduleLink }) => {
  return (
    <div>
      <PopupWidget url={scheduleLink} text={'Schedule Appointment'} />
    </div>
  );
};

export default CalendlyPopupWidget;
