// Grab the form and the message paragraph from your HTML
const form = document.getElementById('form');
const msg = document.getElementById('msg');

// Listen for the user to click "Submit"
form.addEventListener('submit', async (event) => {
  // Prevent the page from refreshing automatically
  event.preventDefault();

  // Grab the text the user typed into the inputs
  const nameValue = document.getElementById('name').value;
  const emailValue = document.getElementById('email').value;
  const commentValue = document.getElementById('comment').value;

  // Show a loading message
  msg.textContent = "Sending...";
  msg.style.color = "blue";

  try {
    // Send the data to your Node.js backend
    const response = await fetch('/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Bundle the data up into JSON format
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        comment: commentValue
      })
    });

    const data = await response.json();

    // If successful, show the success message and clear the form
    if (response.ok) {
      msg.textContent = "✅ " + data.message;
      msg.style.color = "green";
      form.reset(); 
    } else {
      msg.textContent = "❌ " + data.message;
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = "❌ Error connecting to server.";
    msg.style.color = "red";
  }
});
