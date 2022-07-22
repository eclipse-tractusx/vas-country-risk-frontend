/* eslint-disable no-console */
import WorldMap from "react-svg-worldmap";
import React, { useState, useEffect } from "react";
import { getAll } from "../services/dashboard-api";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const CustomWorldMap = (ratings) => {
  const [data, setData] = useState([]);

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  useEffect(() => {
    console.log(ratings.getRatings);
    getAll(ratings.getRatings).then((response) => {
      setData(response);
    });
  }, [ratings.getRatings.length]);

  return (
    <ComposableMap projection="geoMercator">
      <ZoomableGroup center={[10, 50]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let geoMap = new Map();
              data.find((s) => {
                if (s.country === geo.properties.name) {
                  if (s.score >= 40) {
                    geoMap.set("geo", geo);
                    geoMap.set("color", "green");
                    geoMap.set(geo, geo);
                  } else if (s.score >= 25 && s.score < 40) {
                    geoMap.set("geo", geo);
                    geoMap.set("color", "yellow");
                    geoMap.set(geo, geo);
                  } else if (s.score < 25 && s.score > 0) {
                    geoMap.set("geo", geo);
                    geoMap.set("color", "red");
                  }
                } else {
                  geoMap.set(geo, geo);
                }
              });
              return (
                <Geography
                  key={geoMap.get(geo).rsmKey}
                  geography={geoMap.get(geo)}
                  fill={geoMap.size > 0 ? geoMap.get("color") : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default CustomWorldMap;
