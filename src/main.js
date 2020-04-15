import { calculateResult } from './utils';
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

const structureClasses = {
  initNumberClass: INIT_NUMBER_CLASS,
  actionClass: ACTION_CLASS,
  numberClass: NUMBER_CLASS
};

elements.form.addEventListener('submit', event => {
  event.preventDefault();

  const validation = validateForm(
    elements.form,
    ['html', 'structure', 'isNumbers', 'divisionByZero'],
    structureClasses
  );

  if (validation && validation.message) {
    elements.result.classList.add('text-red-500');
    elements.result.textContent = validation.message;
    return;
  }

  elements.result.classList.remove('text-red-500');
  const result = calculateResult(elements.form, structureClasses);
  const displayResult = Number(
    Math.abs(result) % 2 === 0 ? result : result.toFixed(3)
  );
  elements.result.textContent = `Result is: ${displayResult}`;
});

// TODO: implement validation for controls on change
// form.addEventListener('change', e => {});
