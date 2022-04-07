import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const moment = require("moment");
const apiKey = {
  key: "d346be2d71078b4aa955c15f7601dd38",
  base: "https://home.openweathermap.org/api_keys",
};
function App() {
  const [wetherdata, setwetherdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("London");
  const [city, setCity] = useState("");
  const [error, seterror] = useState(false);

  const data = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d346be2d71078b4aa955c15f7601dd38`;
  const fetchapi = async () => {
    const data1 = await fetch(data);
    const data2 = await data1.json();
    if (data2.message) {
      seterror(true);
    } else {
      seterror(false);
      setwetherdata([data2]);
      setloading(false);
      document.getElementById("input2").value = "";
    }
  };
  function showdata(e) {
    e.preventDefault();
    setCity(search);
  }

  useEffect(() => {
    fetchapi();
  }, [city]);
  // console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
  return (
    <div className="App">
      <div className="InputField">
        <form onSubmit={(e) => showdata(e)}>
          <input
            required
            placeholder="Enter Cityname..."
            id="input2"
            type="text"
            pattern="[a-z/A-Z]{1,12}"   // only string data
            title="City Not Found"
            onChange={(e) => setsearch(e.target.value)}
          ></input>

          <button
            onChange={(e) => e.preventDefault()()}
            className="btn"
            type="submit"
          >
            show
          </button>
          {error ? <h5 id="error_Showing">City Not Found..</h5> : null}   // for error showing
        </form>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          wetherdata.map((alldata, i) => {
            return (
              <div className="App" key={i}>
                <h1>{alldata.name}</h1>

                <h2>
                  {+(alldata.main.temp - 273 - 0.2).toFixed(1)}
                  &deg;Cel
                </h2>
                <h3>{moment().format(" Do MMMM YYYY  LT")}</h3>
                <h4>
                  {" "}
                  SunRise : {moment(alldata.sys.sunrise * 1000).format("LT")}  // best for time
                </h4>
                <h4>
                  SunSet : {moment(alldata.sys.sunset * 1000).format("LT")}  // Time formsster sun rise ka
                </h4>
                <h4>Wind Speed : {alldata.wind.speed} h /km</h4>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default App;
