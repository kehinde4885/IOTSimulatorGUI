import getSensorUIStrategy from "./sensorUI.js";

const API = "http://localhost:3000/api/sensors";

async function loadSensors() {
  const res = await fetch(API);
  const sensors = await res.json();

  //log sensor array
  console.log(sensors);

  //Clear existing html
  const list = document.getElementById("sensorList");
  list.innerHTML = "";

  sensors.forEach((sensor) => {
    const strategy = getSensorUIStrategy(sensor.type);

    const div = strategy.render(sensor);

    list.appendChild(div);
  });
}

async function createSensor(e) {
  console.log("Sending data to server");
  e.preventDefault();

  const formData = new FormData(document.getElementById("createSensorForm"));

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const sensorId = formData.get("sensorId");
  const type = formData.get("type");
  const interval = formData.get("interval");

  console.log(JSON.stringify({ sensorId, type, interval }));

  await fetch(`${API}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sensorId, type, interval }),
  });

  loadSensors();
}

async function deleteSensor(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });

  loadSensors();
}

async function updateLightSensor(id) {
  try {
    const response = await fetch(`${API}/update/${id}`, {
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

export { loadSensors, deleteSensor, createSensor, updateLightSensor };
