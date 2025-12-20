import { loadSensors, updateLightSensor, createSensor  } from "./apifunctions";



const API = "http://localhost:3000/api/sensors";


submitBtn = document.getElementById("formSubmit");

submitBtn.addEventListener("click", createSensor);

loadSensors();

