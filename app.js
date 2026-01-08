import {
  loadSensors,
  createSensor,
  createDevice,
  loadDevices,
  loadTemperatureSensors,
} from "./apifunctions.js";

const btn = document.getElementById("abc");

btn.addEventListener("click", async () => {
  await fetch(`http://localhost:3000/api/env/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

const sensorSubmitBtn = document.getElementById("sensorFormSubmit");

sensorSubmitBtn.addEventListener("click", createSensor);

const deviceSubmitBtn = document.getElementById("deviceFormSubmit");

deviceSubmitBtn.addEventListener("click", createDevice);


loadSensors();

loadDevices();

loadTemperatureSensors();
