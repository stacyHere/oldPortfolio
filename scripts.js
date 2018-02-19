const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const links = document.getElementsByClassName('link');
menu.addEventListener('click', function() {
  menu.classList.toggle("active");
  nav.classList.toggle("open");
});
for (i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function() {
    menu.classList.toggle("active");
    nav.classList.toggle("open");
  })
}
const contactMini = document.getElementById('contactMini');
const contactMe = document.getElementById('contactMe');
const contact = document.getElementById('contact');
const form = document.getElementById('form');
const holders = document.querySelectorAll('.holder');
const labels = document.querySelectorAll('.label');
const inputs = document.querySelectorAll('input');
const success = document.getElementById('success');
const fail = document.getElementById('fail');
const h1 = document.getElementById('h1');
const submit = document.getElementById('submit');
const modal = document.getElementById('modal');
const close = document.getElementById('closeModal');

form.setAttribute('novalidate', true);  //disable native browser form validation
const openModal = function() {
  modal.style.display = "flex";
};
const closeModal = function() {
  modal.style.display = "none";
};

holders.forEach(btn => {
  btn.addEventListener('click', function() {
   // btn.textContent += ': ';
    btn.style.width = '80px';
    btn.parentNode.childNodes[3].focus();
  });
});
 let hasError = function(field) {
      if(field.type === 'submit' || field.type === 'button') return;
      let validity = field.validity;
      if (validity.valid) return;  // If valid, return null
      if (validity.valueMissing) return 'Please fill out this field.';    // If field is required and empty
      if (validity.typeMismatch) return 'Please enter a valid email address.';
      if (validity.patternMismatch) return 'Please match the requested format.';  // If pattern doesn't match
    };
let showError = function (field, error) {
  field.classList.add('error');
  let id = field.id || field.name;
  if (!id) return;
  let errorMessage = field.form.querySelector('.error-message#error-for-' + id);
  if(!errorMessage) {
     errorMessage = document.createElement('div');
     errorMessage.className = 'error-message';
     errorMessage.id = 'error-for-' + id;
     field.parentNode.insertBefore(errorMessage, field.nextSibling);
  }
  errorMessage.textContent = error;
  // Show error message
    errorMessage.style.display = 'flex';
    errorMessage.style.visibility = 'visible';
};

let removeError = function(field) {
  // Remove error class to field
    field.classList.remove('error');
    var id = field.id || field.name;
    if (!id) return;

  let message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;
    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
};
  form.addEventListener('blur', function(e) {
    let error = hasError(e.target);
    if (error) {
      showError(e.target, error);
      return;
    }
     removeError(e.target);
  }, true);
contactMini.addEventListener('click', openModal, false);
contactMe.addEventListener('click', openModal, false);
close.addEventListener('click', closeModal, false);

window.onclick = function(event) {
  if(event.target == modal) {
    modal.style.display = "none";
  }
};

// Check all fields on submit
form.addEventListener('submit', function (event) {
event.preventDefault();
    // Get all of the form elements
    var fields = event.target.elements;
    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    var error, hasErrors;
    for (var i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
        event.preventDefault();
        hasErrors.focus();
    }
    // Otherwise, let the form submit normally
    success.className = 'grow';
}, true);
