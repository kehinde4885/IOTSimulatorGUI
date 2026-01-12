import {
  loadSensors,
  createSensor,
  createDevice,
  loadDevices,
  loadTemperatureSensors,
  loadSensorTypes,
  loadDeviceTypes,
  updateEnv,
  loadSmokeSensors,
} from "./apifunctions.js";

import { updateFormFields } from "./helpers.js";

const envUpdateBtn = document.getElementById("abc");
const sensorSubmitBtn = document.getElementById("sensorFormSubmit");
const deviceSubmitBtn = document.getElementById("deviceFormSubmit");
const typeSelect = document.getElementById("deviceType");

envUpdateBtn.addEventListener("click", updateEnv);
sensorSubmitBtn.addEventListener("click", createSensor);

typeSelect.addEventListener("change", (e) => {
  updateFormFields(e.target.value);
});

deviceSubmitBtn.addEventListener("click", createDevice);

//Initialize on custom event trigger
window.addEventListener("deviceTypes:loaded", () => {
  updateFormFields(typeSelect.value);
});

loadSensors();

loadDevices();

loadTemperatureSensors();

loadSmokeSensors()

loadSensorTypes();

loadDeviceTypes();
