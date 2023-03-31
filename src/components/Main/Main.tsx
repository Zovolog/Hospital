import icon from "./search.svg";
import logo from "./logo.jpg";
import TextField from "@mui/material/TextField";
import "./Main.css";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useEffect, useState } from "react";
import { Map } from "../Map/Map";
import axios from "axios";

interface info {
  meta_description: string;
  clinic_name: string;
  email: string;
  suburb_name: string;
  lat: any;
  lng: any;
}
export const Main: React.FC = () => {
  const [info, showInfo] = useState(false);
  const [key, getKey] = useState("");
  const [typeOfRequest, gettypeOfRequest] = useState("");
  const [name, getName] = useState("");
  const [data, setData] = useState([]);
  const [infoAboutClinic, getinfoAboutClinic] = useState<info | null>(null);

  const sendRequest = (
    keyWord: string,
    nameOfRequest: string,
    point: string
  ) => {
    axios
      .post("https://clinics-5wjo.onrender.com/api", {
        query: `
        query ($${keyWord}: String!) {
          ${nameOfRequest}(${keyWord}: $${keyWord}) {
              long_name_version
              pms
              meta_title
              meta_description
              clinic_slug
              website
              clinic_name
              display_on_web
              link_to_clinic_suburb_page
              full_address
              city_name
              suburb_name
              state
              postcode
              email
              phone
              lat
              lng
            }
          }
        `,
        variables: {
          [keyWord]: point,
        },
      })
      .then((response) => {
        console.log(response.data.data[nameOfRequest]);
        setData(response.data.data[nameOfRequest]);
      });
  };
  useEffect(() => {}, []);

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
                onChange={(e) => {
                  getName(e.currentTarget.value);
                }}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13 && name && key) {
                    sendRequest(key, typeOfRequest, name);
                    console.log(key, typeOfRequest, name);
                  }
                }}
              />
            </div>
          </div>
          <div className="main-radio-block ">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              row
              onChange={(e) => {
                getKey(e.currentTarget.value.split(" ")[0]);
                gettypeOfRequest(e.currentTarget.value.split(" ")[1]);
              }}
            >
              <FormControlLabel
                value="cityName searchByCity"
                control={<Radio />}
                label="City Name"
              />
              <FormControlLabel
                value="postCode searchByPostCode"
                control={<Radio />}
                label="Post Code"
              />

              <FormControlLabel
                value="stateName searchByState"
                control={<Radio />}
                label="State"
              />
              <FormControlLabel
                value="slugName searchBySlug"
                control={<Radio />}
                label="Slug"
              />
              <FormControlLabel
                value="clinicName searchByClinicName"
                control={<Radio />}
                label="Name of clinic"
              />
            </RadioGroup>
          </div>
        </div>
        <img src={logo} alt="logo" className="main-logo" />
      </div>
      <div className="main-main-content">
        <div className="main-list-hospital">
          {data.length != 0 ? (
            <div>
              {" "}
              {data.map((item: any, i) => (
                <div
                  key={i}
                  className="main-list-hospital-item"
                  tabIndex={0}
                  onClick={(e) => {
                    getinfoAboutClinic(item);
                  }}
                >
                  <p className="text-l">{item.clinic_name}</p>
                  <p className="text-m">{item.full_address}</p>
                  <div className="main-list-hospital-item-info">
                    {item.display_on_web === "Yes" ? (
                      <a href={item.website} className="link">
                        {item.website}
                      </a>
                    ) : (
                      <p>No website for this clinic</p>
                    )}

                    <p className="text-m">p.{item.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No result!</div>
          )}
        </div>
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
              <div>
                {infoAboutClinic ? (
                  <div className="main-map-info-block-info">
                    <p className="text-l">{infoAboutClinic.clinic_name}</p>
                    <div className="main-map-info-block-info-row">
                      <p className="text-m">{infoAboutClinic.suburb_name}</p>
                      <p className="text-m">{infoAboutClinic.email}</p>
                    </div>
                    <p className="text-m">{infoAboutClinic.meta_description}</p>
                  </div>
                ) : (
                  <p>No info!</p>
                )}
              </div>
            ) : (
              <div className="main-map-info-block-map">
                {infoAboutClinic?.lng ? (
                  <div>
                    <Map
                      defaultZoom={18}
                      defaultCenter={{
                        lat: infoAboutClinic?.lat,
                        lng: infoAboutClinic?.lng,
                      }}
                      markers={data}
                    />
                  </div>
                ) : (
                  <div>
                    <Map
                      defaultZoom={4}
                      defaultCenter={{
                        lat: -25.48796477368385,
                        lng: 134.1424367952019,
                      }}
                      markers={data}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
