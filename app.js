import { loadSensors, createSensor  } from "./apifunctions.js";



const submitBtn = document.getElementById("formSubmit");

submitBtn.addEventListener("click", createSensor);

loadSensors();

