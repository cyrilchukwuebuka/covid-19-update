import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["Worldwide"])

  useEffect(() => {
    const getCountriesData = async () => {
      try{
        await fetch("https://disease.sh/v3/covid-19/countries?sort=cases&allowNull=allowNull")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso3
            }
          ));
          setCountries(countries)
        })
      } catch(err){
        console.log(err)
      }
    }

    getCountriesData()
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1> COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title = 'Coronavirus cases' total={2000} cases={12345}/>
          <InfoBox title = 'Recovered' total={3000} cases={1234}/>
          <InfoBox title = 'Deaths' total={4000} cases={123}/>
        </div>
        <Map />
      </div>

      <div className="app_right">
        
      </div>
    </div>
  );
}

export default App;
