
// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  
    // Write your code to manipulate the DOM here
    document.body.classList.toggle("dark-mode");
}


// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);

// Add your query for the sign now button here
const signNowButton = document.getElementById("sign-now-button");

// Variable to keep track of total signatures
let count = 3;

// Function to add signature
const addSignature = (person) => { // Accept person as a parameter
    // Reselect petitionInputs and save their values using the person object
    const name = person.name;
    const email = person.email;
    const hometown = person.hometown;

    // Format signature text using person's information
    const signatureText = `🖊️ ${name} from ${hometown} (${email}) supports this.`;

    // Create new paragraph element
    const signatureElement = document.createElement("p");
    signatureElement.textContent = signatureText;

    // Find the element with id 'counter'
    const counterElement = document.getElementById("counter");

    // Get the signatures section
    const signaturesSection = document.querySelector(".signatures");

    // Insert the new signature before the counter element
    counterElement.parentNode.insertBefore(signatureElement, counterElement);

    // Increment count and update counter text
    count++;
    counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    // If there are more than 6 signatures, remove the oldest one
    if (signaturesSection.children.length > 6) {
        signaturesSection.removeChild(signaturesSection.firstElementChild);
    }
};

// Step 4: Animate the image within the modal
let scaleFactor = 1; // Create a variable for scale factor

const modalImage = document.querySelector("#thanks-modal img"); // Select the image within the modal

// Create a function to scale the image
const scaleImage = () => {
  // Toggle the scale factor between 1 and 0.8
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;

  // Apply the scale factor to the image
  modalImage.style.transform = `scale(${scaleFactor})`;
};

// Modify the showModal function to include image animation
const showModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("modal-text-container");

  modal.style.display = "flex";
  modalContent.textContent = `Thank you, ${person.name}, for signing the petition!`;

  // Start the image animation
  const intervalId = setInterval(scaleImage, 500);

  // Hide the modal after 5 seconds
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); // Stop the animation
  }, 5000);
};



const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
      name: petitionInputs[0].value,
      email: petitionInputs[1].value,
      hometown: petitionInputs[2].value
  };

  for (let i = 0; i < 3; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error'); // Add error class
    } else {
      petitionInputs[i].classList.remove('error'); // Remove error class
    }
  }

  // Validate email
  const email = document.getElementById('email');
  if (!email.value.includes('.com')) {
      containsErrors = true;
      email.classList.add('error'); // Add error class to highlight input
  } else {
      email.classList.remove('error'); // Remove error class if present
  }
  
  if (containsErrors == false) {
    addSignature(person); // Add signature if no errors
    
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = ""; // Clear form inputs
    }
    showModal(person);
  }
};

signNowButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    validateForm(); // Call the validateForm function
});

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

// Function to reveal containers when they come into view
function reveal() {
  // Get the height of the window
  let windowHeight = window.innerHeight;

  // Loop through each revealable container
  for (let i = 0; i < revealableContainers.length; i++) {
    // Get the top position of the revealable container
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    // Check if the top of the container is within the reveal distance from the bottom of the window
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      // Add the "active" class to reveal the container
      revealableContainers[i].classList.add('active');
    } else {
      // Remove the "active" class to hide the container
      revealableContainers[i].classList.remove('active');
    }
  }
}

// Add event listener to window scroll event to trigger the reveal function
window.addEventListener('scroll', reveal);

const reduceMotion = () => {
    // Update animation object properties
    animation.transitionDuration = '0s'; // Set transition duration to 0 to disable animation

    // Loop through revealable containers and update their styles
    for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transition = animation.transitionDuration; // Set transition to 0s
    }
};

const reduceMotionButton = document.getElementById("reduce-motion-button");

reduceMotionButton.addEventListener("click", reduceMotion);


const closeButton = document.getElementById("close-modal-button");

const closeModal = () => {
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none";
};

closeButton.addEventListener("click", closeModal);
