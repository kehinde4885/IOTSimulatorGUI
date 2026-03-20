const DEVICE_DEFINATIONS = {
  HVAC: {
    label: "HVAC",
    fields: ["deviceId", "deviceType", "tempSensorId", "interval"],
  },
  FAN: {
    label: "FAN",
    fields: ["deviceId", "deviceType", "interval"],
  },
  ALARM: {
    label: "ALARM",
    fields: ["deviceId", "deviceType", "interval", "smokeSensorId"],
  },
  WINDOW: {
    label: "WINDOW",
    fields: ["deviceId", "deviceType", "interval"],
  },
  DOOR: {
    label: "DOOR",
    fields: ["deviceId", "deviceType", "interval"],
  },
};

export { DEVICE_DEFINATIONS };
