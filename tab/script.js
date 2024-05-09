document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tablink");
  const tabContents = document.querySelectorAll(".tabcontent");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      activateTab(tabId);
      activateTab(tabId);
    });
  });

  function activateTab(tabId) {
    tabContents.forEach((tabContent) => {
      tabContent.style.display = "none";
    });
    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove("active");
    });
    // Add Display Block  on Clicked Tab Content and Add class Active on Button Tab
    document.getElementById(tabId).style.display = "block";
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
  }

  // Activate the first tab by default
  activateTab("tab1");
});
