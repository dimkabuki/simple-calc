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
  structure: (form, structureClasses) => {
    const { actions, numbers } = getStructure(form, structureClasses);
    return !!actions &&
      !!numbers &&
      actions.length === numbers.length &&
      actions.every(action => datasetIsNumber(action)) &&
      numbers.every(number => datasetIsNumber(number))
      ? null
      : errors.structure;
  },
  isNumbers: (form, structureClasses) => {
    const { numbers } = getStructure(form, structureClasses);
    return !!numbers && numbers.every(({ value }) => !isNaN(Number(value)))
      ? null
      : errors.isNumbers;
  },
  divisionByZero: (form, structureClasses) => {
    const model = getModel(getStructure(form, structureClasses));
    return model.some(
      ({ action, number }) => action === 'divide' && number === 0
    )
      ? errors.divisionByZero
      : null;
  }
};

export function validateForm(form, validationsList = [], structureClasses) {
  for (let i = 0; i < validationsList.length; i++) {
    const key = validationsList[i];
    if (typeof validations[key] === 'function') {
      const message = validations[key](form, structureClasses);
      if (message) {
        return { message };
      }
    } else {
      return { message: 'Unknown validation' };
    }
  }
  return null;
}
