document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.getElementById("days-container");
    const timesContainer = document.getElementById("times-container");
    const scheduleSection = document.getElementById("schedule");
    const formContainer = document.getElementById("form-container");
    const reservationForm = document.getElementById("reservation-form");

    const modal = document.getElementById("confirmation-modal");
    const modalDetails = document.getElementById("confirmation-details");
    const closeModalBtn = document.getElementById("close-modal");

    let selectedDate = "";
    let selectedTime = "";

    // Generar los días dinámicamente (siguientes 7 días)
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);

        const dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.textContent = day.getDate();
        dayElement.dataset.date = day.toISOString().split("T")[0];
        dayElement.addEventListener("click", () => selectDay(dayElement));
        daysContainer.appendChild(dayElement);
    }

    // Al seleccionar un día
    function selectDay(dayElement) {
        document.querySelectorAll(".day").forEach(day => day.classList.remove("selected"));
        dayElement.classList.add("selected");
        selectedDate = dayElement.dataset.date;

        renderTimes();
        scheduleSection.classList.add("fade", "active");
    }

    // Renderizar horarios disponibles
    function renderTimes() {
        timesContainer.innerHTML = "";

        const availableTimes = ["10:00", "12:00", "14:00", "16:00"];

        availableTimes.forEach(time => {
            const timeSlot = document.createElement("div");
            timeSlot.className = "time-slot";
            timeSlot.textContent = time;
            timeSlot.addEventListener("click", () => selectTime(time));
            timesContainer.appendChild(timeSlot);
        });
    }

// Seleccionar horario
    function selectTime(time) {
        // Remover selección previa
        document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));
        
        selectedTime = time;

        // Resaltar el horario seleccionado
        const selectedSlot = Array.from(document.querySelectorAll(".time-slot"))
            .find(slot => slot.textContent === time);
        selectedSlot.classList.add("selected");

        formContainer.classList.add("fade", "active");
    }


    // Enviar formulario y mostrar modal de confirmación
    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const notes = document.getElementById("notes").value;

        if (selectedDate && selectedTime) {
            modalDetails.innerHTML = `
                <strong>Fecha:</strong> ${selectedDate} <br>
                <strong>Hora:</strong> ${selectedTime} <br>
                <strong>Nombre:</strong> ${name} <br>
                <strong>Correo:</strong> ${email} <br>
                <strong>Comentarios:</strong> ${notes || "Ninguno"}
            `;

            modal.classList.remove("hidden");
        } else {
            alert("Por favor, selecciona un día y una hora.");
        }
    });

    // Cerrar modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        resetForm();
    });

    // Resetear formulario después de cerrar el modal
    function resetForm() {
        reservationForm.reset();
        formContainer.classList.remove("active");
        scheduleSection.classList.remove("active");
        selectedDate = "";
        selectedTime = "";
        document.querySelectorAll(".day").forEach(day => day.classList.remove("selected"));
    }
});
