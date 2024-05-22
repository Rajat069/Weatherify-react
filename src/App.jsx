import { useState } from "react";
import axios from "axios";
import BottomB from "./BottomB";
import { FaSearch } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import countries from "./assets/countries.json";

function App() {
  const [data, setData] = useState({});
  const [, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const searchLocation = () => {
    const newLocation = document.getElementById("sea").value;
    setLocation(newLocation);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&units=imperial&appid=ec26f2221b0b58e92391ee088381013d`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        getFullCountyName(response.data.sys.country);
        document.getElementById("main").style.height = "85.6vh";
      })
      .catch((error) => {
        console.log(error);
        console.log(url);
      });
    document.getElementById("sea").value = "";
  };

  async function getFullCountyName(countryCode) {
    for (let i of countries) {
      if (i.code === countryCode) {
        setCountry(i.name);
      }
    }
  }
  function convertToCelsius(f) {
    f = f.toFixed();
    return (((f - 32) * 5) / 9).toFixed();
  }
  console.log();
  return (
    <>
      <div className="app" id="main">
        <div className="search">
          <input placeholder="Enter Location" type="text" id="sea" />
          <button onClick={searchLocation}>
            <FaSearch />
          </button>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              {data.name ? (
                <p>
                  {data.name} ,{country}
                </p>
              ) : (
                <h2 style={{ fontSize: "5vw" }}>
                  <TiWeatherPartlySunny />
                  Weatherify
                </h2>
              )}
            </div>
            <div className="temp">
              {data.main ? (
                <h1>{convertToCelsius(data.main.temp)}°C</h1>
              ) : (
                <p style={{ fontSize: "3vh", marginLeft: "10px" }}>
                  Your guide to every weather, everywhere <BiWorld />
                </p>
              )}
            </div>
            <div className="max-min-temp">
              {data.main ? (
                <p>Max Temp: {convertToCelsius(data.main.temp_max)}°C</p>
              ) : null}
              {data.main ? (
                <p>Min Temp: {convertToCelsius(data.main.temp_min)}°C</p>
              ) : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        </div>
      </div>
      <BottomB data={data} />
    </>
  );
}

export default App;
