document.addEventListener("DOMContentLoaded", function() {
    // Get references to HTML elements
    var bookingForm = document.getElementById("booking-form");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var appointmentList = document.getElementById("appointment-list");

    // Load existing appointments from localStorage
    var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Function to update the displayed appointments
    function updateAppointments() {
        appointmentList.innerHTML = "";
        for (var i = 0; i < appointments.length; i++) {
            var li = document.createElement("li");
            li.className = "appointment-item";

            // Create a delete button for each appointment
            var deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-button";
            deleteBtn.textContent = "delete";

            // Create a div to display the appointment text
            var appointmentDiv = document.createElement("div");
            appointmentDiv.className = "appointment-text";
            appointmentDiv.textContent = "Name: " + appointments[i].name + ", Email: " + appointments[i].email;

            li.appendChild(appointmentDiv);
            li.appendChild(deleteBtn);
            appointmentList.appendChild(li);
        }
    }

    // Submit the form
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var name = nameInput.value;
        var email = emailInput.value;

        if (name && email) {
            // Create an appointment object
            var appointment = { name: name, email: email };

            // Add the appointment to the array
            appointments.push(appointment);

            // Save the updated array to localStorage
            localStorage.setItem("appointments", JSON.stringify(appointments));

            // Clear the form inputs
            nameInput.value = "";
            emailInput.value = "";

            // Update the displayed appointments
            updateAppointments();
        }
    });

    // Delete appointment when the 'X' button is clicked
    appointmentList.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-button")) {
            var li = e.target.parentElement;
            var index = Array.from(appointmentList.children).indexOf(li);
            appointments.splice(index, 1);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            updateAppointments();
        }
    });

    // Initialize the displayed appointments
    updateAppointments();
});
