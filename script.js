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
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expire in 'days'
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Load preferences from cookies on page load
function loadPreferences() {
  const fontSize = getCookie("fontSize");
  const fontColor = getCookie("fontColor");

  // Apply the font size if found in cookies
  if (fontSize) {
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }

  // Apply the font color if found in cookies
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
  setCookie("fontSize", fontSize, 365); // Cookie expires in 365 days
  setCookie("fontColor", fontColor, 365); // Cookie expires in 365 days

  // Apply new preferences immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
});

// Load preferences when the page is loaded
window.onload = loadPreferences;
console.log("fontSize cookie set:", getCookie("fontSize"));
console.log("fontColor cookie set:", getCookie("fontColor"));
