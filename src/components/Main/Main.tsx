import icon from "./search.svg";
import logo from "./logo.jpg";
import TextField from "@mui/material/TextField";
import "./Main.css";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { Map } from "../Map/Map";
export const Main: React.FC = () => {
  const [info, showInfo] = useState(false);
  const markers = [
    { id: 1, lat: 37.7749, lng: -122.4194 },
    { id: 2, lat: 37.7748, lng: -122.4195 },
    { id: 3, lat: 37.7747, lng: -122.4196 },
  ];
  return (
    <div className="main-wrapper">
      <div className="main-header">
        <div className="main-search-block">
          <div className="main-search-input">
            <img src={icon} alt="logo" className="main-icon" />
            <div className="main-input">
              <TextField
                id="outlined-basic"
                label="Type keyword..."
                variant="outlined"
              />
            </div>
          </div>
          <div className="main-radio-block ">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel value="city" control={<Radio />} label="City" />
              <FormControlLabel
                value="state"
                control={<Radio />}
                label="State"
              />
              <FormControlLabel value="zip" control={<Radio />} label="ZIP" />
              <FormControlLabel
                value="name"
                control={<Radio />}
                label="Clinic name"
              />
              <FormControlLabel
                value="suburb"
                control={<Radio />}
                label="Suburb"
              />
            </RadioGroup>
          </div>
        </div>
        <img src={logo} alt="logo" className="main-logo" />
      </div>
      <div className="main-main-content">
        <div className="main-list-hospital"></div>
        <div className="main-map-info-block">
          <div className="main-map-info-block-header">
            <div
              className="main-map-info-block-header-element"
              tabIndex={0}
              onClick={(e) => {
                showInfo(false);
              }}
            >
              Location
            </div>
            <div
              className="main-map-info-block-header-element"
              tabIndex={0}
              onClick={(e) => {
                showInfo(true);
              }}
            >
              About clinic
            </div>
          </div>
          <div>
            {info ? (
              <div className="main-map-info-block-info">Hello!</div>
            ) : (
              <div className="main-map-info-block-map">
                <Map
                  containerElement={<div style={{ height: "400px" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                  defaultZoom={8}
                  defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                  markers={markers}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxTs3qwXrNWl4HZhjSDxxAFKfYGoyBdmM&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
