import {
  toggleSensorSwitch,
  deleteSensor,
  deleteDevice,
  toggleDevicePower,
} from "./apifunctions.js";

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
      toggleSensorSwitch(sensor.sensorId);
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
    button2.classList.add("sensor-button", "change-button");

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

//refactor
class DoorSensorUI {
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
        <p class="sensor-status">Status: ${sensor.value ? "OPEN" : "CLOSE"}</p>
        <p class="sensor-interval">Interval: ${sensor.interval}ms</p>
      </div>`;

    button.addEventListener("click", () => {
      deleteSensor(sensor.sensorId);
    });
    button.innerHTML = `Delete`;

    button2.addEventListener("click", () => {
      toggleSensorSwitch(sensor.sensorId);
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

class SmokeSensorUI {
  render(sensor) {
    const SmokeSensordiv = document.createElement("div");
    const sensorInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    SmokeSensordiv.className = "smokeSensor";
    sensorInfo.className = "sensor-info";
    buttonWrapper.className = "sensor-actions";
    button.className = "sensor-button";
    button2.className = "sensor-button";

    SmokeSensordiv.appendChild(sensorInfo);
    SmokeSensordiv.appendChild(buttonWrapper);
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
      toggleSensorSwitch(sensor.sensorId);
    });

    if (sensor.value) {
      button2.innerHTML = "Turn OFF";
    } else {
      button2.classList.add("on");
      button2.innerHTML = "Turn ON";
    }

    return SmokeSensordiv;
  }
}

class HVACDeviceUI {
  render(device) {
    const deviceDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    infoDiv.className = "info";
    deviceDiv.className = "hvac-card";
    button.className = "button";
    button2.className = "button";

    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(button2);
    deviceDiv.appendChild(infoDiv);
    deviceDiv.appendChild(buttonWrapper);

    infoDiv.innerHTML = `<div class="info-left">
            <p class="id">HVAC ${device.id}</p>
            <p class="status">Status: ${
              device.mode === "OFF" ? "OFF" : "ON"
            }</p>
            <p class="temp">Target Temp: ${device.targetTemp}°C</p>
          </div>
          <div class="info-right">
            <p class="mode">MODE: ${device.mode}</p>
          </div>`;

    button.innerHTML = "DELETE";
    button.addEventListener("click", () => deleteDevice(device.id));

    button2.innerHTML = "Turn Off";
    button2.addEventListener("click", () => {
      toggleDevicePower(device.id);
    });

    if (!device.isOn) {
      button2.innerHTML = "Turn On";
      button2.classList.add("on");
    }

    return deviceDiv;
  }
}

//****** */

class AlarmDeviceUI {
  render(device) {
    const alarmDeviceDiv = document.createElement("div");
    const deviceInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    alarmDeviceDiv.className = "alarmDevice";
    deviceInfo.className = "device-info";
    buttonWrapper.className = "device-actions";
    button.className = "device-button";

    alarmDeviceDiv.appendChild(deviceInfo);
    alarmDeviceDiv.appendChild(buttonWrapper);

    buttonWrapper.appendChild(button);

    deviceInfo.innerHTML = `     <div class="device-info">
        <p class="device-id">SMOKE ${device.type} ${device.id}</p>
        <p class="device-status">Status: ${device.isActive ? "ON" : "OFF"}</p>
        <p class="device-interval">Interval: ${device.interval}ms</p>
      </div>`;

    button.addEventListener("click", () => {
      deleteDevice(device.id);
    });
    button.innerHTML = `Delete`;

    if (device.isOn) {
    } else {
    }

    return alarmDeviceDiv;
  }
}

//****** */

class FANDeviceUI {
  render(device) {
    const fanDeviceDiv = document.createElement("div");
    const deviceInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    fanDeviceDiv.className = "fanDevice";
    deviceInfo.className = "device-info";
    buttonWrapper.className = "device-actions";
    button.className = "device-button";
    button2.className = "device-button";

    fanDeviceDiv.appendChild(deviceInfo);
    fanDeviceDiv.appendChild(buttonWrapper);
    buttonWrapper.appendChild(button2);
    buttonWrapper.appendChild(button);

    deviceInfo.innerHTML = `     <div class="device-info">
        <p class="device-id">${device.type} ${device.id}</p>
        <p class="device-status">Status: ${device.isOn ? "ON" : "OFF"}</p>
        <p class="device-interval">Interval: ${device.interval}ms</p>
      </div>`;

    button.addEventListener("click", () => {
      deleteDevice(device.id);
    });
    button.innerHTML = `Delete`;

    button2.addEventListener("click", () => {
      toggleDevicePower(device.id);
    });

    if (device.isOn) {
      button2.innerHTML = "Turn OFF";
    } else {
      button2.classList.add("on");
      button2.innerHTML = "Turn ON";
    }

    return fanDeviceDiv;
  }
}

//****** */

class WindowDeviceUI {
  render(device) {
    const windowDeviceDiv = document.createElement("div");
    const deviceInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    windowDeviceDiv.className = "fanDevice";
    deviceInfo.className = "device-info";
    buttonWrapper.className = "device-actions";
    button.className = "device-button";
    button2.className = "device-button";

    windowDeviceDiv.appendChild(deviceInfo);
    windowDeviceDiv.appendChild(buttonWrapper);
    buttonWrapper.appendChild(button2);
    buttonWrapper.appendChild(button);

    deviceInfo.innerHTML = `     <div class="device-info">
        <p class="device-id">${device.type} ${device.id}</p>
        <p class="device-status">Status: ${device.isOn ? "OPEN" : "CLOSE"}</p>
        <p class="device-interval">Interval: ${device.interval}ms</p>
      </div>`;

    button.addEventListener("click", () => {
      deleteDevice(device.id);
    });
    button.innerHTML = `Delete`;

    button2.addEventListener("click", () => {
      toggleDevicePower(device.id);
    });

    if (device.isOn) {
      button2.innerHTML = "CLOSE";
    } else {
      button2.classList.add("on");
      button2.innerHTML = "OPEN";
    }

    return windowDeviceDiv;
  }
}

//****** */

class DoorDeviceUI {
  render(device) {
    const doorDeviceDiv = document.createElement("div");
    const deviceInfo = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    doorDeviceDiv.className = "fanDevice";
    deviceInfo.className = "device-info";
    buttonWrapper.className = "device-actions";
    button.className = "device-button";
    button2.className = "device-button";

    doorDeviceDiv.appendChild(deviceInfo);
    doorDeviceDiv.appendChild(buttonWrapper);
    buttonWrapper.appendChild(button2);
    buttonWrapper.appendChild(button);

    deviceInfo.innerHTML = `     <div class="device-info">
        <p class="device-id">${device.type} ${device.id}</p>
        <p class="device-status">Status: ${device.isOn ? "OPEN" : "CLOSE"}</p>
        <p class="device-interval">Interval: ${device.interval}ms</p>
      </div>`;

    button.addEventListener("click", () => {
      deleteDevice(device.id);
    });
    button.innerHTML = `Delete`;

    button2.addEventListener("click", () => {
      toggleDevicePower(device.id);
    });

    if (device.isOn) {
      button2.innerHTML = "CLOSE";
    } else {
      button2.classList.add("on");
      button2.innerHTML = "OPEN";
    }

    return doorDeviceDiv;
  }
}

export default function getSensorUIStrategy(type) {
  switch (type) {
    case "Light":
      return new LightSensorUI();
    case "Temperature":
      return new TemperatureSensorUI();
    case "Door":
      return new DoorSensorUI();
    case "Smoke":
      return new SmokeSensorUI();
    default:
      return null;
  }
}

function getDeviceUIStrategy(type) {
  switch (type) {
    case "HVAC":
      return new HVACDeviceUI();
    case "FAN":
      return new FANDeviceUI();
    case "ALARM":
      return new AlarmDeviceUI();
    case "WINDOW":
      return new WindowDeviceUI();
    case "DOOR":
      return new DoorDeviceUI();
  }
}

export { getDeviceUIStrategy };
