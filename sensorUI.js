import { updateLightSensor, deleteSensor } from "./apifunctions.js";

class LightSensorUI {
  render(sensor) {
    const lightSensordiv = document.createElement("div");
    const sensorInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    lightSensordiv.className = "lightSensor";
    sensorInfo.className = "sensor-info";
    buttonWrapper.className = "sensor-actions";
    button.className = "sensor-button";
    button2.className = "sensor-button";

    lightSensordiv.appendChild(sensorInfo);
    lightSensordiv.appendChild(buttonWrapper);
    buttonWrapper.appendChild(button2);
    buttonWrapper.appendChild(button);

    sensorInfo.innerHTML = `     <div class="sensor-info">
        <p class="sensor-id">Sensor ${sensor.sensorId}</p>
        <p class="sensor-type">Type: ${sensor.type}</p>
        <p class="sensor-status">Status: ${sensor.value ? "ON" : "OFF"}</p>
        <p class="sensor-interval">Interval: ${sensor.interval}ms</p>
      </div>`;

    button.addEventListener("click", () => {
      deleteSensor(sensor.sensorId);
    });
    button.innerHTML = `Delete`;

    button2.addEventListener("click", () => {
      updateLightSensor(sensor.sensorId);
    });

    if (sensor.value) {
      button2.innerHTML = "Turn OFF";
    } else {
      button2.classList.add("on");
      button2.innerHTML = "Turn ON";
    }

    return lightSensordiv;
  }
}

class TemperatureSensorUI {
  render(sensor) {
    const tempSensordiv = document.createElement("div");
    const sensorInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    tempSensordiv.className = "temperatureSensor";
    sensorInfo.className = "sensor-info";
    buttonWrapper.className = "sensor-actions";
    button.className = "sensor-button";
    button2.classList.add("sensor-button" , "change-button");

    tempSensordiv.appendChild(sensorInfo);
    tempSensordiv.appendChild(buttonWrapper);
    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(button2);

    sensorInfo.innerHTML = `
    <div class="info-left">
    <p class="sensor-id"> Sensor ${sensor.sensorId}</p>
    <p class="sensor-value"> Value: ${Math.floor(sensor.value)}°C</p>
    </div>
    <div class="info-right">
    <p class="sensor-type"> Type: ${sensor.type}</p>
    <p class="sensor-interval"> Interval: ${sensor.interval}ms</p>
    </div>
    `;

    button.addEventListener("click", () => {
      deleteSensor(sensor.sensorId);
    });

    button.innerHTML = `Delete`;
    button2.innerHTML = `Change`;

    return tempSensordiv;
  }
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
