
import { DEVICE_DEFINATIONS } from "./formSchema.js";
const deviceForm = document.getElementById("deviceForm");


function updateFormFields(type) {
  //get the array of fields from schema
  // using the selected device type

  const allowedFields = DEVICE_DEFINATIONS[type].fields;

  //returns the divs inside the form with attribute
  //"data-field" in an array
  deviceForm.querySelectorAll("[data-field]").forEach((div) => {
    //store the value of the data-field attribute
    const fieldName = div.dataset.field;

    //change style of div depending on
    //whether it is in the allowed fields array
    div.style.display = allowedFields.includes(fieldName) ? "block" : "none";
  });
}


export {updateFormFields}