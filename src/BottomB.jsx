import "./bottomB.css";
import PropTypes from "prop-types";
import { FaWind } from "react-icons/fa6";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";

export default function BottomB(props) {
  function coneertToCelsius(f) {
    f = f.toFixed();
    return (((f - 32) * 5) / 9).toFixed();
  }
  return (
    props.data.name !== undefined && (
      <div className="bottom">
        <div className="feels b1">
          {props.data.main ? (
            <p className="bold">
              <FaTemperatureHigh />
              &nbsp;
              {coneertToCelsius(props.data.main.feels_like)}
              °C
            </p>
          ) : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity b1">
          {props.data.main ? (
            <p className="bold">
              <WiHumidity />
              &nbsp;
              {props.data.main.humidity}%
            </p>
          ) : null}
          <p>Humidity</p>
        </div>
        <div className="wind b1">
          {props.data.wind ? (
            <p className="bold">
              <FaWind /> &nbsp;
              {props.data.wind.speed.toFixed()} MPH
            </p>
          ) : null}
          <p>Wind Speed</p>
        </div>
        <div className="visibility b1">
          {props.data.visibility ? (
            <p className="bold">
              <MdOutlineVisibility /> &nbsp;
              {props.data.visibility / 10} KM
            </p>
          ) : null}
          <p>Visibility</p>
        </div>
      </div>
    )
  );
}
BottomB.propTypes = {
  data: PropTypes.object,
};
