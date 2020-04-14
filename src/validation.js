import { getModel, getStructure } from './utils';

const errors = {
  html: 'Form validation failed!',
  structure:
    'Inconsistent fields! Actions should match numbers and have numbers in `data-n` attribute',
  isNumbers: 'Operands should be numbers!',
  divisionByZero: 'Illigal operation! Division by zero'
};

const datasetIsNumber = ({ dataset }, dataKey = 'n') =>
  !isNaN(Number(dataset[dataKey]));

const validations = {
  html: form => (form.checkValidity() ? null : errors.html),
  structure: (form, classes) => {
    const { actions, numbers } = getStructure(form, classes);
    return !!actions &&
      !!numbers &&
      actions.length === numbers.length &&
      actions.every(action => datasetIsNumber(action)) &&
      numbers.every(number => datasetIsNumber(number))
      ? null
      : errors.structure;
  },
  isNumbers: (form, classes) => {
    const { numbers } = getStructure(form, classes);
    return !!numbers && numbers.every(({ value }) => !isNaN(Number(value)))
      ? null
      : errors.isNumbers;
  },
  divisionByZero: (form, classes) => {
    const model = getModel(getStructure(form, classes));
    return model.some(
      ({ action, number }) => action === 'divide' && number === 0
    )
      ? errors.divisionByZero
      : null;
  }
};

export function validateForm(form, validationsList = [], classes) {
  for (let i = 0; i < validationsList.length; i++) {
    const key = validationsList[i];
    if (typeof validations[key] === 'function') {
      const message = validations[key](form, classes);
      if (message) {
        return { message };
      }
    } else {
      return { message: 'Unknown validation' };
    }
  }
  return null;
}
