import getSensorUIStrategy from "./renderUI.js";
import { getDeviceUIStrategy } from "./renderUI.js";
import { DEVICE_DEFINATIONS } from "./formSchema.js";

const SensorsAPI = "http://localhost:3000/api/sensors";

const DevicesAPI = "http://localhost:3000/api/devices";

const EnvAPI = "http://localhost:3000/api/env";

async function loadSensors() {
  const res = await fetch(SensorsAPI);
  const sensors = await res.json();

  //log sensor array
  //console.log(sensors);

  //Clear existing html
  const sensorList = document.getElementById("sensorList");
  sensorList.innerHTML = "";

  sensors.forEach((sensor) => {
    const strategy = getSensorUIStrategy(sensor.type);

    const div = strategy.render(sensor);

    sensorList.appendChild(div);
  });
}

async function loadDevices() {
  const res = await fetch(`${DevicesAPI}`);
  const devices = await res.json();

  console.log("loading devices");
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

async function loadDeviceTypes() {
  const result = await fetch(`${DevicesAPI}/types`);
  const deviceTypes = await result.json();

  const deviceTypeList = document.getElementById("deviceType");

  for (const deviceType of deviceTypes) {
    const option = document.createElement("option");
    option.textContent = deviceType;
    option.value = deviceType;
    deviceTypeList.appendChild(option);
  }

  //create and Fire a custom Event
  const event = new Event("deviceTypes:loaded");
  window.dispatchEvent(event);
}

async function loadTemperatureSensors() {
  try {
    const response = await fetch(SensorsAPI);
    const sensors = await response.json();

    const select = document.getElementById("tempSensorIdSelect");
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

async function loadSmokeSensors() {
  try {
    const response = await fetch(SensorsAPI);
    const sensors = await response.json();

    const select = document.getElementById("smokeSensorIdSelect");
    select.innerHTML = "";

    const smokeSensors = sensors.filter((sensor) => sensor.type === "Smoke");

    if (smokeSensors.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No Smoke Sensors available";
      option.disabled = true;
      select.appendChild(option);
      return;
    }

    for (const sensor of smokeSensors) {
      const option = document.createElement("option");
      option.value = sensor.sensorId;
      //Optional:Add sensor name to textcontent
      option.textContent = `ID: ${sensor.sensorId}`;
      select.appendChild(option);
    }
  } catch (error) {
    console.error("Failed to load Smoke sensors:", error);
  }
}

async function loadSensorTypes() {
  try {
    const data = await fetch(`${SensorsAPI}/types`);
    const sensorTypes = await data.json();

    //console.log("Types", sensorTypes);

    const select = document.getElementById("sensorType");

    if (sensorTypes.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No sensor Types registered";
      option.disabled = true;
      select.appendChild(option);
      return;
    }

    for (const type of sensorTypes) {
      const option = document.createElement("option");

      option.value = type;
      option.textContent = type;
      select.appendChild(option);
    }
  } catch (error) {
    console.log(error);
  }
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

  //formData.get uses the name of the input field
  const sensorId = formData.get("sensorId");
  const type = formData.get("sensorType");
  const interval = formData.get("interval");

  console.log(
    "Sending to Server",
    JSON.stringify({ sensorId, type, interval })
  );

  await fetch(`${SensorsAPI}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sensorId, type, interval }),
  });

  loadSensors();
}

//
async function createDevice(e) {
  e.preventDefault();

  const form = document.getElementById("deviceForm");

  //validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  console.log("Sending create device data to server");

  const formData = new FormData(form);

  const body = {};

  const allowedFields = DEVICE_DEFINATIONS[formData.get("deviceType")].fields;

  for (const [key, value] of formData.entries()) {
    if (allowedFields.includes(key)) {
      body[key] = value;
    }
  }

  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

  // const type = formData.get("deviceType");
  // const deviceId = formData.get("deviceId");
  // const interval = formData.get("interval");
  // const TempSensorId = formData.get("tempSensorId");

  // const body = { type, deviceId, interval, TempSensorId };

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

async function deleteSensor(id) {
  await fetch(`${SensorsAPI}/${id}`, { method: "DELETE" });

  loadSensors();
}

async function deleteDevice(id) {
  await fetch(`${DevicesAPI}/${id}`, { method: "DELETE" });

  loadDevices();
}

async function toggleSensorSwitch(id) {
  try {
    const response = await fetch(`${SensorsAPI}/toggle/${id}`, {
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

async function updateEnv() {
  await fetch(`http://localhost:3000/api/env/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function toggleDevicePower(id) {
  try {
    const response = await fetch(`${DevicesAPI}/toggleSwitch/${id}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("device not found");
    }

    const data = await response.json();

    loadDevices();
    console.log("Device updated", data);
  } catch (error) {
    console.error(error.message);
  }
}

export {
  loadSensors,
  deleteSensor,
  createSensor,
  toggleSensorSwitch,
  createDevice,
  loadDevices,
  loadTemperatureSensors,
  loadSmokeSensors,
  loadSensorTypes,
  loadDeviceTypes,
  updateEnv,
  deleteDevice,
  toggleDevicePower,
};
