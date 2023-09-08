import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import SelectComp from "./SelectComp";
import Rick from "./Rick";

function App() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get("https://trahult.pythonanywhere.com/api/patients/1/2023-07-09/")
      .then((res) => {
        console.log(res.data, "<<<data");
      })
      .catch((err) => {
        console.log(err, "error in getting data");
      });
  };
  return (
    <div>
      <div className="App">Testing api get RAHUL</div>
      <SelectComp />
      <Rick />
    </div>
  );
}

export default App;
