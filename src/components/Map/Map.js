import './Map.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { showDataOnMap } from '../../utils/utils'

function Map({ countries, caseType, center, zoom }) {
 
    return (
        <MapContainer className="map" center={center} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showDataOnMap(countries, caseType)}
        </MapContainer>

    )
}

export default Map

