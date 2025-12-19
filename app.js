const API = "http://localhost:3000/api/sensors";

submitBtn = document.getElementById("formSubmit");

submitBtn.addEventListener("click", createSensor);

async function createSensor(e) {
  console.log("Handling");
  e.preventDefault();

  const formData = new FormData(document.getElementById("createSensorForm"));

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const sensorId = formData.get("sensorId");
  const type = formData.get("type");
  const interval = formData.get("interval");

  console.log(JSON.stringify({ sensorId, type, interval }));

  await fetch(API, {
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

async function loadSensors() {
  const res = await fetch(API);
  const sensors = await res.json();

  const list = document.getElementById("sensorList");
  list.innerHTML = "";

  sensors.forEach((sensor) => {
    s;
    const div = document.createElement("div");
    div.className = "sensor";
    div.innerHTML = `${s.sensorId} (${s.type}) -${s.interval}ms
    <button onclick="deleteSensor('${s.sensorId}')">Delete </button>`;
  });
}

loadSensors();
