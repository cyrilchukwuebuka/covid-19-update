import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const caseTypeColors = {
    cases: {
        hex: '#CC1034',
        rgb: 'rgb(204, 16, 52)',
        half_op: 'rgba(204, 16, 52, 0.5)',
        multiplier: 500
    },
    recovered: {
        hex: '#7dd71d',
        rgb: 'rgb(125, 215, 29)',
        half_op: 'rgba(125, 215, 29, 0.5)',
        multiplier: 800
    },
    deaths: {
        hex: '#fb4443',
        rgb: 'rgb(251, 68, 67)',
        half_op: 'rgba(251, 68, 67, 0.5)',
        multiplier: 500
    },
}

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

// Draw circles on the map and interactive tooltip
export const showDataOnMap = (data, caseType = 'cases') => (
    data.map(country => (
        // console.log('======', country.countryInfo.lat, country.countryInfo.long)
        // console.log('mmmmm', Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier)

        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{ color: caseTypeColors[caseType].rgb, fillColor: caseTypeColors[caseType].rgb }}
            radius={Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier}
            stroke={false}
        >
            <Popup
                center={[country.countryInfo.lat, country.countryInfo.long]}>
                <div className='info-container'>
                    <div className='info-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className='info-name'>{country.country}</div>
                    <div className='info-confirmed'>Cases: {numeral(country.cases).format('0,0')}</div>
                    <div className='info-recovered'>recovered: {numeral(country.recovered).format('0,0')}</div>
                    <div className='info-deaths'>Deaths: {numeral(country.deaths).format('0,0')}</div>
                </div>
            </Popup>
        </Circle>
    ))
)