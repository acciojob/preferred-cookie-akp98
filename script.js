//your JS code here. If required.
// Function to get a cookie by name
function getCookie(name) {
  const nameEq = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEq) === 0) {
      return c.substring(nameEq.length, c.length);
    }
  }
  return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Load preferences from cookies on page load
function loadPreferences() {
  const fontSize = getCookie("fontSize");
  const fontColor = getCookie("fontColor");

  if (fontSize) {
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty("--fontcolor", fontColor);
    document.getElementById("fontcolor").value = fontColor;
  }
}

// Handle form submission to save preferences
document.getElementById("preferences-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Set cookies for font size and font color
  setCookie("fontSize", fontSize, 365); // 365 days expiry
  setCookie("fontColor", fontColor, 365); // 365 days expiry

  // Apply new preferences immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
});

// Load preferences when the page is loaded
window.onload = loadPreferences;
