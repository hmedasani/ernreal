'use client';
import { Property } from '../../types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';
import Link from 'next/link';

interface MapViewProps {
  properties: Property[];
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

export default function MapView({ properties }: MapViewProps) {
  const center: [number, number] = properties.length > 0 
    ? [properties[0].location.lat, properties[0].location.lng]
    : [40.7128, -74.0060]; // default NYC

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} />
        {properties.map(property => (
          <Marker 
            key={property.id} 
            position={[property.location.lat, property.location.lng]}
          >
            <Popup>
              <div className="p-0 m-0 w-48">
                 <Link href={`/properties/${property.id}`} className="font-semibold hover:underline">
                   {property.title}
                 </Link>
                 <p className="text-muted-foreground mt-1 text-sm">${property.price.toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground mt-1 capitalize">{property.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
