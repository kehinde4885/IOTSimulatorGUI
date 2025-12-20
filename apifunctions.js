async function loadSensors() {
  const res = await fetch(API);
  const sensors = await res.json();

  console.log(sensors);

  const list = document.getElementById("sensorList");
  list.innerHTML = "";

  sensors.forEach((sensor) => {
    const div = document.createElement("div");
    div.className = "sensor";
    div.innerHTML = `
    <p> ${sensor.sensorId} (${sensor.type}) -${sensor.interval}ms</p>
    <p>Status: ${sensor.value} </p> 
    <button onclick="deleteSensor('${sensor.sensorId}')">Delete </button>
    <button onclick="updateLightSensor('${sensor.sensorId}')"> ${
      sensor.value === "On" ? "Turn Off" : "Turn ON"
    } </button>
    `;

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

  loadSensors()
}


function sensorGUI() {
  
}

export { loadSensors, deleteSensor, createSensor , updateLightSensor};
