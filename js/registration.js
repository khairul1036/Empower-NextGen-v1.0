// Function to set current date and time before form submission
function setDateTime() {
    const now = new Date();
    const offset = 6 * 60; // Bangladesh time is UTC+6 hours
    const localTime = new Date(now.getTime() + offset * 60 * 1000);

    // Format date and time as a string (ISO format is common)
    const datetime = localTime.toISOString(); // ISO string in UTC
    document.querySelector('input[name="datetime"]').value = datetime;
}




document.addEventListener('DOMContentLoaded', () => {
    const teamMembersContainer = document.getElementById('teamMembersContainer');
    const radioButtons = document.querySelectorAll('input[name="teamMembers"]');

    function updateTeamMemberFields() {
        const selectedValue = document.querySelector('input[name="teamMembers"]:checked').value;
        teamMembersContainer.innerHTML = ''; // Clear existing fields

        for (let i = 0; i < parseInt(selectedValue); i++) {
            const fieldset = document.createElement('fieldset');
            fieldset.className = 'mb-4 p-4 border border-gray-300 rounded';
            fieldset.innerHTML = `
                <legend class="text-gray-200">Team Member ${i + 1}:</legend>
                <label for="memberName${i}" class="block text-gray-200">Name:</label>
                <input type="text" id="memberName${i}" name="memberName${i}" class="w-full p-2 border border-gray-500 rounded bg-DarkBlueBlack focus:outline-none focus:border-RaspberryRed focus:ring-RaspberryRed focus:ring-1" placeholder="MD Khan" required>
                <label for="memberEmail${i}" class="block text-gray-200 mt-2">Email:</label>
                <input type="email" id="memberEmail${i}" name="memberEmail${i}" class="w-full p-2 border border-gray-500 rounded bg-DarkBlueBlack focus:outline-none focus:border-RaspberryRed focus:ring-RaspberryRed focus:ring-1" placeholder="khan@gmail.com" required>
                <label for="memberPhone${i}" class="block text-gray-200 mt-2">Phone:</label>
                <input type="number" id="memberPhone${i}" name="memberPhone${i}" class="w-full p-2 border border-gray-500 rounded bg-DarkBlueBlack focus:outline-none focus:border-RaspberryRed focus:ring-RaspberryRed focus:ring-1" placeholder="017xxxxxxxx" required>
                <label for="memberTshirtSize${i}" class="block text-gray-200 mt-2">T-Shirt Size:</label>
                <select id="memberTshirtSize${i}" name="memberTshirtSize${i}" class="w-full p-2 border border-gray-500 rounded bg-DarkBlueBlack focus:outline-none focus:border-RaspberryRed focus:ring-RaspberryRed focus:ring-1" required>
                    <option value="" disabled selected>Select T-Shirt Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                </select>
            `;
            teamMembersContainer.appendChild(fieldset);
        }
    }

    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateTeamMemberFields);
    });

    // Initial call to set up the form
    updateTeamMemberFields();
});





const scriptURL =
  "https://script.google.com/macros/s/AKfycbxx1eLy6_5H4Us8wc6_W5TpR3dNIi7nZ0tnJIVh5-FKGSdjQllJBRjopQlRPg8X4DWerA/exec"; // Replace with your Google Apps Script URL
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Set the teamID (you might need to do this after getting it from the server)
  document.querySelector('input[name="teamID"]').value = ""; // Initially empty, will be set by the server

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success!", data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your form has been submitted. Wait for Confirmation Email.",
      });
    })
    .catch((error) => {
      console.error("Error!", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
});
