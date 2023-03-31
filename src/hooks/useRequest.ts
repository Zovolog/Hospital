import axios from "axios";
import { useState, useEffect } from "react";

export const useRequest = (keyWord: string, nameOfRequest: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
          keyWord: "Albo",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData };
};
