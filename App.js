import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
const apiKey = {
  key: "d346be2d71078b4aa955c15f7601dd38",
  base: "https://home.openweathermap.org/api_keys",
};
function App() {
  const [wetherdata, setwetherdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [serch, setserch] = useState("London");
  const [state, setsate] = useState("Londen");
  const [error, seterror] = useState(false);

  const data = `https://api.openweathermap.org/data/2.5/weather?q=${serch}&appid=d346be2d71078b4aa955c15f7601dd38`;
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
    setsate(serch);
  }

  var d = new Date();
  var n = d.toLocaleString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const dat = d.toLocaleString().split(",")[0];

  useEffect(() => {
    fetchapi();
  }, [state]);
  return (
    <div className="App">
      <div className="InputField">
        <form onSubmit={(e) => showdata(e)}>
          <input
            required
            placeholder="Enter Cityname..."
            id="input2"
            type="text"
            onChange={(e) => setserch(e.target.value)}
          ></input>
          {error ? <h5 id="error_Showing">City Not Found..</h5> : null}
          <button
            onChange={(e) => e.preventDefault()()}
            className="btn"
            type="submit"
          >
            show
          </button>
        </form>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          wetherdata.map((alldata, i) => {
            return (
              <div className="App" key={i}>
                <h1>{alldata.name}</h1>

                <h2>
                  {(alldata.main.temp - 273 + 1).toFixed(1)}
                  &deg;Cel
                </h2>
                <h3>
                  {dat} &nbsp;&nbsp;
                  {n}
                </h3>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default App;
