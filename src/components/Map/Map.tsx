import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { FC, useState } from "react";

interface MapProps {
  defaultZoom: number;
  defaultCenter: { lat: number; lng: number };
  markers: { id: number; lat: number; lng: number }[];
  info: string;
}
interface selectedMarker {
  clinic_name: string;
  lat: number;
  lng: number;
}

export const Map: FC<MapProps> = ({
  defaultZoom,
  defaultCenter,
  markers,
}: MapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<selectedMarker | null>(
    null
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCxTs3qwXrNWl4HZhjSDxxAFKfYGoyBdmM",
  });
  const containerStyle = {
    width: "100%",
    height: "480px",
  };

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
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
      {markers.map((marker: any, i) => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          key={i}
          icon={"https://cdn-icons-png.flaticon.com/32/4812/4812047.png"}
          onClick={() => handleMarkerClick(marker)}
          title={marker.clinic_name}
          zIndex={1}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>{selectedMarker.clinic_name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
