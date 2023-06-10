import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};

const populateFormFields = () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value
  };
  console.log(formState);
  localStorage.removeItem('feedback-form-state');
  form.reset();
};

form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);

populateFormFields();
