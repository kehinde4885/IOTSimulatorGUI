import { loadSensors, createSensor } from "./apifunctions.js";

const btn = document.getElementById("abc");

btn.addEventListener("click", async () => {
  await fetch(`http://localhost:3000/api/env/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

const submitBtn = document.getElementById("formSubmit");

submitBtn.addEventListener("click", createSensor);

loadSensors();
