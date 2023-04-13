import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { FC, useEffect, useState } from "react";

interface MapProps {
  defaultZoom: number;
  defaultCenter: { lat: number; lng: number };
  markers: { id: number; lat: number; lng: number }[];
  markerInfo: any;
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
  markerInfo,
}: MapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<selectedMarker | null>(
    null
  );
  useEffect(() => {
    if (markerInfo) {
      setSelectedMarker(markerInfo);
    }
  }, [defaultCenter]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCxTs3qwXrNWl4HZhjSDxxAFKfYGoyBdmM",
  });
  const containerStyle = {
    width: "100%",
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
      {markers.map((marker: any, i) => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          key={i}
          icon={
            selectedMarker &&
            selectedMarker.lat === marker.lat &&
            selectedMarker.lng === marker.lng
              ? {
                  url: "https://cdn-icons-png.flaticon.com/64/4812/4812047.png",
                  scaledSize: new window.google.maps.Size(70, 70),
                }
              : ""
          }
          onClick={() => {
            setSelectedMarker(marker);
          }}
          title={marker.clinic_name}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
          options={{
            pixelOffset: new google.maps.Size(0, -40),
          }}
        >
          <div>{selectedMarker.clinic_name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
