document.addEventListener("DOMContentLoaded", function () {
    const vehicleTypeSelect = document.getElementById("vehicleType");
    const fuelTypeContainer = document.getElementById("fuelTypeContainer");
    const fuelTypeSelect = document.getElementById("fuelType");

    vehicleTypeSelect.addEventListener("change", function () {
      const selectedVehicleType = this.value;
      if (selectedVehicleType === "car" || selectedVehicleType === "bike") {
        fuelTypeContainer.style.display = "block";
      } else {
        fuelTypeContainer.style.display = "none";
        fuelTypeSelect.value = "none";
        fuelTypeSelect.required = false;
      }
    });
    vehicleTypeSelect.dispatchEvent(new Event("change"));
  });