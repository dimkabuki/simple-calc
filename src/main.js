// import { calculateResult } from './model';
import { validateForm } from './validation';

const INIT_NUMBER_CLASS = 'js-init-number';
const ACTION_CLASS = 'js-action';
const NUMBER_CLASS = 'js-number';

const FORM_CLASS = 'js-form';
const SUBMIT_CLASS = 'js-submit';
const RESULT_CLASS = 'js-result';

const elements = {
  form: document.querySelector(`.${FORM_CLASS}`),
  intiNumber: document.querySelector(`.${INIT_NUMBER_CLASS}`),
  actions: document.querySelectorAll(`.${ACTION_CLASS}`),
  numbers: document.querySelectorAll(`.${NUMBER_CLASS}`),
  submit: document.querySelector(`.${SUBMIT_CLASS}`),
  result: document.querySelector(`.${RESULT_CLASS}`)
};

elements.form.addEventListener('submit', event => {
  event.preventDefault();

  console.log('START VALIDATION');

  const isValid = validateForm(
    elements.form,
    ['html', 'structure', 'isNumbers', 'divisionByZero'],
    {
      initNumberClass: INIT_NUMBER_CLASS,
      actionClass: ACTION_CLASS,
      numberClass: NUMBER_CLASS
    }
  );
  console.log('RESULT', isValid);
});

// TODO: implement validation for controls on change
// form.addEventListener('change', e => {});
