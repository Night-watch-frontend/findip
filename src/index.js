import { getAddress, validateIP } from "./helpers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../images/icon-location.svg";
import { addTileLayer } from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timeZoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");
const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});

addTileLayer(map);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  /* iconAnchor: [22, 94], */
});

L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIP(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  } else {
    alert("Please enter a valid IP address");
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone, isp } = mapData.location;

  ipInfo.textContent = mapData.ip;
  locationInfo.textContent = `${country}, ${region}`;
  timeZoneInfo.textContent = timezone;
  ispInfo.textContent = isp;
  map.setView([lat, lng], 13);

  L.marker([lat, lng], {
    icon: markerIcon,
  }).addTo(map);
}
