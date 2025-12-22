import { updateLightSensor } from "./apifunctions.js";

class LightSensorUI {
  render(sensor) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    div.className = "sensor";
    div.append(p, p2, button, button2);

    p.innerHTML = `${sensor.sensorId} (${sensor.type}) -${sensor.interval}ms`;
    p2.innerHTML = `Status: ${sensor.value}`;

    button.addEventListener("click", () => {
      deleteSensor(sensor.sensorId);
    });
    button.innerHTML = `Delete`;

    button2.addEventListener("click", () => {
      updateLightSensor(sensor.sensorId);
    });

    button2.innerHTML = `${sensor.value === "On" ? "Turn Off" : "Turn ON"}`;

    return div;
  }
}

class TemperatureSensorUI {
  render(sensor) {}
}

export default function getSensorUIStrategy(type) {
  switch (type) {
    case "Light":
      return new LightSensorUI();
    case "Temperature":
      return new TemperatureSensorUI();
    default:
      return null;
  }
}
