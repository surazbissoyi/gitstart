document.addEventListener("DOMContentLoaded", function() {
    var bookingForm = document.getElementById("booking-form");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var appointmentList = document.getElementById("appointment-list");

    var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    function updateAppointments() {
        appointmentList.innerHTML = "";
        for (var i = 0; i < appointments.length; i++) {
            var li = document.createElement("li");
            li.className = "appointment-item";

            var deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-button";
            deleteBtn.textContent = "X";

            var editBtn = document.createElement("button");
            editBtn.className = "edit-button";
            editBtn.textContent = "Edit";

            var appointmentDiv = document.createElement("div");
            appointmentDiv.className = "appointment-text";
            appointmentDiv.textContent = "Name: " + appointments[i].name + ", Email: " + appointments[i].email;

            li.appendChild(appointmentDiv);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            appointmentList.appendChild(li);
        }
    }

    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var name = nameInput.value;
        var email = emailInput.value;

        if (name && email) {
            var appointment = { name: name, email: email };
            appointments.push(appointment);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            nameInput.value = "";
            emailInput.value = "";
            updateAppointments();
        }
    });

    appointmentList.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-button")) {
            var li = e.target.parentElement;
            var index = Array.from(appointmentList.children).indexOf(li);
            appointments.splice(index, 1);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            updateAppointments();
        } else if (e.target.classList.contains("edit-button")) {
            var li = e.target.parentElement;
            var index = Array.from(appointmentList.children).indexOf(li);
            var appointment = appointments[index];
            appointments.splice(index, 1);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            updateAppointments();
            
            nameInput.value = appointment.name;
            emailInput.value = appointment.email;
        }
    });

    updateAppointments();
});
