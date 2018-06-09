makeFromActive = function makeActive() {
  document.getElementById("activityDate").disabled = false;
  for (var x = 0; x < 7; x++) {
    document.getElementById("inlineCheckBox" + x).disabled = false;
    document.getElementById("checkboxes").style.background = "";
  }
};

disableDate = function disableDateplox() {
  var dateDisabled;
  for (var x = 0; x < 7; x++) {
    if (document.getElementById("inlineCheckBox" + x).checked) {
      dateDisabled = true;
    }
  }
  if (dateDisabled) {
    document.getElementById("activityDate").disabled = true;
  } else {
    document.getElementById("activityDate").disabled = false;
  }
};

disableCheckbox1 = function disableCheckboxplox() {
  for (var x = 0; x < 7; x++) {
    document.getElementById("inlineCheckBox" + x).disabled = true;
    document.getElementById("checkboxes").style.background = "rgb(236, 238, 239)";
  }

  if (document.getElementById("activityDate").value === "") {
    for (var x = 0; x < 7; x++) {
      document.getElementById("inlineCheckBox" + x).disabled = false;
      document.getElementById("checkboxes").style.background = "";
    }
  }
};

plox = function nineineineien() {
  if (document.getElementById("defaultCheck1").checked) {
    alert("You have clicked on Orange.");
    document.getElementById("test").disabled = true;
  }
};
