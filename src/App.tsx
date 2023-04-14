import React, { createContext, useState } from "react";
import "./App.css";
import { Main } from "./components/Main/Main";
interface activeLink {
  activeLinkFromMap: any;
  getActiveLinkFromMap: any;
  infoMarker: any;
  getInfoMarker: any;
}

export const link = createContext({} as activeLink);
function App() {
  const [activeLinkFromMap, getActiveLinkFromMap] = useState<null | Number>(
    null
  );
  const [infoMarker, getInfoMarker] = useState<null | Object>(null);
  return (
    <link.Provider
      value={{
        activeLinkFromMap,
        getActiveLinkFromMap,
        infoMarker,
        getInfoMarker,
      }}
    >
      <div className="App">
        <Main index={activeLinkFromMap} marker={infoMarker} />
      </div>
    </link.Provider>
  );
}

export default App;
