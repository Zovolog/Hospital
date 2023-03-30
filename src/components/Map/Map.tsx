import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { FC } from "react";

interface MapProps {
  defaultZoom: number;
  defaultCenter: { lat: number; lng: number };
  markers: { id: number; lat: number; lng: number }[];
}

export const Map: FC<MapProps> = ({
  defaultZoom,
  defaultCenter,
  markers,
}: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCxTs3qwXrNWl4HZhjSDxxAFKfYGoyBdmM",
  });
  const containerStyle = {
    width: "calc(100% - 2rem)",
    height: "480px",
  };
  if (!isLoaded) return <p>NO WAY</p>;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={defaultZoom}
      center={{
        lat: defaultCenter.lat,
        lng: defaultCenter.lng,
      }}
    >
      {markers.map((marker: any) => (
        <MarkerF
          position={{ lat: marker.lat, lng: marker.lng }}
          key={marker.id}
        />
      ))}
    </GoogleMap>
  );
};
