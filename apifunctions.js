import getSensorUIStrategy from "./renderUI.js";
import { getDeviceUIStrategy } from "./renderUI.js";

const SensorsAPI = "http://localhost:3000/api/sensors";

const DevicesAPI = "http://localhost:3000/api/devices";

const EnvAPI = "http://localhost:3000/api/env";

async function loadSensors() {
  const res = await fetch(SensorsAPI);
  const sensors = await res.json();

  //log sensor array
  console.log(sensors);

  //Clear existing html
  const sensorList = document.getElementById("sensorList");
  sensorList.innerHTML = "";

  sensors.forEach((sensor) => {
    const strategy = getSensorUIStrategy(sensor.type);

    const div = strategy.render(sensor);

    sensorList.appendChild(div);
  });
}

async function createSensor(e) {
  e.preventDefault();

  const form = document.getElementById("createSensorForm");

  //validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  console.log("Creating Sensor at Server");

  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const sensorId = formData.get("sensorId");
  const type = formData.get("type");
  const interval = formData.get("interval");

  console.log(JSON.stringify({ sensorId, type, interval }));

  await fetch(`${SensorsAPI}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sensorId, type, interval }),
  });

  loadSensors();
}

async function deleteSensor(id) {
  await fetch(`${SensorsAPI}/${id}`, { method: "DELETE" });

  loadSensors();
}

async function updateLightSensor(id) {
  try {
    const response = await fetch(`${SensorsAPI}/update/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Sensor not founf");
    }

    const data = await response.json();

    console.log("Sensor updated", data);
  } catch (error) {
    console.error(error.message);
  }

  loadSensors();
}

async function createDevice(e) {
  e.preventDefault();

  const form = document.getElementById("createDeviceForm");

  //validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  console.log("Sending create device data to server");

  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const deviceId = formData.get("deviceId");
  const interval = formData.get("interval");
  const TempSensorId = formData.get("sensorId");

  const body = { deviceId, interval, TempSensorId };

  console.log(JSON.stringify(body));

  try {
    const response = await fetch(`${DevicesAPI}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    console.log("HVAC Created:", result);
  } catch (error) {
    console.error(error);
  }

  loadDevices();
}

async function loadDevices() {
  const res = await fetch(`${DevicesAPI}`);
  const devices = await res.json();

  console.log(devices);

  //Clear existing html
  const deviceList = document.getElementById("deviceList");
  deviceList.innerHTML = "";

  devices.forEach((device) => {
    const strategy = getDeviceUIStrategy(device.type);

    const div = strategy.render(device);

    deviceList.appendChild(div);
  });
}

async function loadTemperatureSensors() {
  try {
    const response = await fetch(SensorsAPI);
    const sensors = await response.json();

    const select = document.getElementById("tempSensorSelect");
    select.innerHTML = "";

    const tempSensors = sensors.filter(
      (sensor) => sensor.type === "Temperature"
    );

    if (tempSensors.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No Temperature Sensors available";
      option.disabled = true;
      select.appendChild(option);
      return;
    }

    for (const sensor of tempSensors) {
      const option = document.createElement("option");
      option.value = sensor.sensorId;
      //Optional:Add sensor name to textcontent
      option.textContent = `ID: ${sensor.sensorId}`;
      select.appendChild(option);
    }
  } catch (error) {
    console.error("Failled to load temperature sensors:", error);
  }
}
export {
  loadSensors,
  deleteSensor,
  createSensor,
  updateLightSensor,
  createDevice,
  loadDevices,
  loadTemperatureSensors,
};
