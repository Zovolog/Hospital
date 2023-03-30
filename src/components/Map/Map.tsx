import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
interface MapProps {
  defaultZoom: number;
  defaultCenter: { lat: number; lng: number };
  markers: { id: number; lat: number; lng: number }[];
  children?: React.ReactNode;
}

export const Map = withScriptjs(
  withGoogleMap<MapProps>((props: MapProps) => (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={{
        lat: props.defaultCenter.lat,
        lng: props.defaultCenter.lng,
      }}
    >
      {props.markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  ))
);
