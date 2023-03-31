import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FC, useEffect } from "react";

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
    width: "100%",
    height: "480px",
  };

  useEffect(() => {}, []);
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
      {markers.map((marker: any, i) => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          key={i}
          icon={"https://cdn-icons-png.flaticon.com/32/4812/4812047.png"}
        />
      ))}
    </GoogleMap>
  );
};
