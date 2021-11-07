import "./App.css";
import { FormControl, MenuItem, Select, Card, CardContent } from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table"
import {sortData} from "./utils/utils"
import LineGraph from "./components/LineGraph/LineGraph";
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["Worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all?allowNull=allowNull')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        await fetch("https://disease.sh/v3/covid-19/countries?allowNull=allowNull")
          .then(response => response.json())
          .then(data => {
            const countries = data.map(country => (
              {
                name: country.country,
                value: country.countryInfo.iso3
              }
            ));
            const sortedData = sortData(data)
            setTableData(sortedData)
            setCountries(countries)
          })
      } catch (err) {
        console.log(err)
      }
    }

    getCountriesData()
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'Worldwide' ? 
      'https://disease.sh/v3/covid-19/all?allowNull=allowNull' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true&allowNull=allowNull`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    })
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
          <InfoBox title='Corona Virus Cases' total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title='Recovered' total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title='Deaths' total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>
        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new case</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
