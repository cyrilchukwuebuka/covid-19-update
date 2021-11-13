import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

function LineGraph({caseType}) {
    const [data, setData] = useState({})
    const [issue, setIssue] = useState('cases')

    const buildChartData = (data, caseType='cases') => {
        const chartData = [];
        let lastDataPoint;
        setIssue(caseType)

        for (let key in data[caseType]){
            // console.log(key)
            // console.log(data[caseType][key])
            if(lastDataPoint){
                const newDataPoint = {
                    x: key,
                    y: data[caseType][key] - lastDataPoint
                }
                chartData.push(newDataPoint);
            } else {
                lastDataPoint = data[caseType][key];
            }
        }

        return chartData;
    }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const chartData = buildChartData(data, caseType);
            setData(chartData)
        })
    }, [caseType])

    return (
        <div>
        {/* <h2>I'm a graph</h2> */}
        {data?.length > 0 && (
            <Line 
                data={{
                    datasets: [{
                        label: issue,
                        fill: true,
                        backgroundColor: "rgba(2004, 16, 52, 0.3)",
                        borderColor: "#CC1034",
                        data: data
                    }]
                }}
                
            />
        )}
        </div>
    )
}

export default LineGraph
