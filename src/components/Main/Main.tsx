import "./Main.css";
import "./radio.css";
import "./loader.css";
import {
  useEffect,
  useState,
  useRef,
  createContext,
  FC,
  useContext,
} from "react";
import { Map } from "../Map/Map";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { link } from "../../App";

interface info {
  meta_description: string;
  clinic_name: string;
  email: string;
  suburb_name: string;
  lat: any;
  lng: any;
}

interface mainProps {
  index: any;
  marker: any;
}

export const Main: FC<mainProps> = ({ index, marker }: mainProps) => {
  const location = useLocation();
  const keyWord = new URLSearchParams(location.search).get("param");
  const nameWord = new URLSearchParams(location.search).get("key");
  const typeWord = new URLSearchParams(location.search).get("type");
  const [activeElement, showActiveElement] = useState<null | Number>(null);
  const [info, showInfo] = useState(false);
  const [loading, showLoading] = useState(false);
  const [key, getKey] = useState("cityName");
  const [typeOfRequest, gettypeOfRequest] = useState("searchByCity");
  const [name, getName] = useState("");
  const [data, setData] = useState([]);
  const [infoAboutClinic, getinfoAboutClinic] = useState<info | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (keyWord && nameWord && typeWord) {
      sendRequest(keyWord, typeWord, nameWord);
      getName(nameWord);
    } else {
      showLoading(true);
      axios
        .get("https://clinics-v3kk.onrender.com/api", {
          params: {
            query: `
      query {
        allClinics {
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
          },
        })
        .then((response) => {
          console.log(response.data.data.allClinics);
          setData(response.data.data.allClinics);
          showLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (index) {
      showActiveElement(index);
      getinfoAboutClinic(marker);
      console.log(marker);
    }
  }, [index]);
  const sendRequest = (
    keyWord: string,
    nameOfRequest: string,
    point: string
  ) => {
    showLoading(true);
    axios
      .post("https://clinics-v3kk.onrender.com/api", {
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
        setData(response.data.data[nameOfRequest]);
        showLoading(false);
      });
  };

  const gettingValue = (e: any) => {
    getKey(e.currentTarget.value.split(" ")[0]);
    gettypeOfRequest(e.currentTarget.value.split(" ")[1]);
  };

  return (
    <div className="main-wrapper">
      <div className="main-header">
        <div className="main-search-block">
          <div className="main-search-input">
            <div className="main-input">
              <input
                type="text"
                placeholder="Type keyword..."
                className="text-field"
                onChange={(e) => {
                  getName(e.currentTarget.value);
                }}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13 && name && key) {
                    sendRequest(key, typeOfRequest, name);
                    navigate(
                      `/?type=${typeOfRequest}&param=${key}&key=${name}`
                    );
                  }
                }}
                value={name}
              />
              {loading ? (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <button
                  className="bt-search"
                  onClick={(ev) => {
                    if (name && key) {
                      sendRequest(key, typeOfRequest, name);
                      navigate(
                        `/?type=${typeOfRequest}&param=${key}&key=${name}`
                      );
                    }
                  }}
                >
                  Search-clinics
                </button>
              )}
            </div>
          </div>
          <div className="main-radio-block ">
            <p className="input-block">
              <input
                type="radio"
                id="CityName"
                name="radio-group"
                defaultChecked
                value="cityName searchByCity"
                onChange={(e) => gettingValue(e)}
              />
              <label htmlFor="CityName">City Name</label>
            </p>
            <p className="input-block">
              <input
                type="radio"
                id="PostCode"
                name="radio-group"
                value="postCode searchByPostCode"
                onChange={(e) => gettingValue(e)}
              />
              <label htmlFor="PostCode">Post Code</label>
            </p>
            <p className="input-block">
              <input
                type="radio"
                id="State"
                name="radio-group"
                value="stateName searchByState"
                onChange={(e) => gettingValue(e)}
              />
              <label htmlFor="State">State</label>
            </p>
            <p className="input-block">
              <input
                type="radio"
                id="Slug"
                name="radio-group"
                value="slugName searchBySlug"
                onChange={(e) => gettingValue(e)}
              />
              <label htmlFor="Slug">Slug</label>
            </p>
            <p className="input-block">
              <input
                type="radio"
                id="NameOfClinic"
                name="radio-group"
                value="clinicName searchByClinicName"
                onChange={(e) => gettingValue(e)}
              />
              <label htmlFor="NameOfClinic">Clinic name</label>
            </p>
          </div>
        </div>
      </div>
      <div className="main-main-content">
        <div className="main-list-hospital">
          {data.length !== 0 ? (
            <div>
              {" "}
              {data.map((item: any, i) => (
                <div
                  key={i}
                  tabIndex={0}
                  onClick={(e) => {
                    getinfoAboutClinic(item);
                    showActiveElement(i);
                    console.log(i);
                  }}
                  className={
                    activeElement === i
                      ? "main-list-hospital-item green"
                      : "main-list-hospital-item"
                  }
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
            <p className="text-l">No result!</p>
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
                  <div className="main-map-info-block-no-info">
                    <p className="text-l">Pls select a clinic</p>
                  </div>
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
                      markerInfo={infoAboutClinic}
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
                      markerInfo={null}
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
