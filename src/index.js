import { validateIP } from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timeZoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIP(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_IdEHDaDCryRksyyLgC8nbMLhVTDXb&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  console.log(mapData);

  ipInfo.textContent = mapData.ip;
  locationInfo.textContent = `${mapData.location.country}, ${mapData.location.region}`;
  timeZoneInfo.textContent = mapData.location.timezone;
  ispInfo.textContent = mapData.isp;
}
