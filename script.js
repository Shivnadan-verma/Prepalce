// script.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Toggle navigation menu for smaller screens (if needed)
const navLinks = document.querySelector('.navbar nav');
const menuToggle = document.querySelector('.navbar .cta');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal for 'Start Your Free Analysis' (you can expand this later)
const startBtn = document.querySelector('.cta'); 
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
    <div class="modal-content">
        <h3>Welcome to Placement Predictor!</h3>
        <p>Please enter your details to start the analysis:</p>
        <form id="analysis-form">
            <label for="cgpa">CGPA:</label>
            <input type="number" id="cgpa" name="cgpa" required>
            <label for="sessional">Sessional Marks:</label>
            <input type="number" id="sessional" name="sessional" required>
            <label for="attendance">Attendance (%):</label>
            <input type="number" id="attendance" name="attendance" required>
            <label for="amcat">AMCAT Score:</label>
            <input type="number" id="amcat" name="amcat" required>
            <button type="submit">Submit</button>
        </form>
        <button class="close-modal">Close</button>
    </div>
`;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.appendChild(modal);
});

document.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
});

// Handle form submission (you can link to backend later)
document.querySelector('#analysis-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cgpa = document.getElementById('cgpa').value;
    const sessional = document.getElementById('sessional').value;
    const attendance = document.getElementById('attendance').value;
    const amcat = document.getElementById('amcat').value;
    
    // You can perform predictions or analysis here and display the results.
    alert(`Your details:
    CGPA: ${cgpa}
    Sessional Marks: ${sessional}
    Attendance: ${attendance}%
    AMCAT Score: ${amcat}`);
    
    document.body.removeChild(modal); // Close modal after submission
});
