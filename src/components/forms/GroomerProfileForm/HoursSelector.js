import React, { useContext } from 'react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import './form.scss';
import { GroomersContext } from '../../../state/contexts/GroomersContext';

const HoursSelector = props => {
  const { updateCloseHours, updateOpenHours } = props;
  const { hours } = useContext(GroomersContext);

  // TODO try to get the stringified groomerInfo.hours into an object for
  //  placeholders (temporarily commented out until we handle this or remove
  //  them entirely)

  return (
    <div className="hours-container">
      <p>Hours of Operation</p>
      <div className="day-container">
        <div>Open</div>
        <div>Close</div>
      </div>
      <p>Sunday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.sunday.open}
            onChange={value => updateOpenHours('sunday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.sunday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.sunday.close}
            onChange={value => updateCloseHours('sunday', value.format('LT'))}
          />
        </div>
      </div>
      <p>Monday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.monday.open}
            onChange={value => updateOpenHours('monday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.monday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.monday.close}
            onChange={value => updateCloseHours('monday', value.format('LT'))}
          />
        </div>
      </div>
      <p>Tuesday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.tuesday.open}
            onChange={value => updateOpenHours('tuesday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.tuesday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.tuesday.close}
            onChange={value => updateCloseHours('tuesday', value.format('LT'))}
          />
        </div>
      </div>
      <p>Wednesday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.wednesday.open}
            onChange={value => updateOpenHours('wednesday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.wednesday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.wednesday.close}
            onChange={value =>
              updateCloseHours('wednesday', value.format('LT'))
            }
          />
        </div>
      </div>
      <p>Thursday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.thursday.open}
            onChange={value => updateOpenHours('thursday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.thursday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.thursday.close}
            onChange={value => updateCloseHours('thursday', value.format('LT'))}
          />
        </div>
      </div>
      <p>Friday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.friday.open}
            onChange={value => updateOpenHours('friday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.friday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.friday.close}
            onChange={value => updateCloseHours('friday', value.format('LT'))}
          />
        </div>
      </div>
      <p>Saturday</p>
      <div className="day-container">
        <div>
          <TimePicker
            format="h:mm a"
            // placeholder={hoursOfOpp.saturday.open}
            onChange={value => updateOpenHours('saturday', value.format('LT'))}
          />
        </div>
        <div>
          <TimePicker
            disabled={hours.saturday.open === undefined && true}
            format="h:mm a"
            // placeholder={hoursOfOpp.saturday.close}
            onChange={value => updateCloseHours('saturday', value.format('LT'))}
          />
        </div>
      </div>
    </div>
  );
};

export default HoursSelector;
