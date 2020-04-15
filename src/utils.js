const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

const valueReducer = (format = String) => (accumulator, { value, dataset }) => {
  accumulator[Number(dataset.n)] = format(value);
  return accumulator;
};

const resultReducer = (accumulator, { action, number }) =>
  operations[action](accumulator, number);

export function getStructure(
  form,
  { initNumberClass, actionClass, numberClass }
) {
  const fields = form.elements;
  const result = {
    initNumber: null,
    actions: [],
    numbers: []
  };

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].classList.contains(initNumberClass)) {
      result.initNumber = fields[i];
    }
    if (fields[i].classList.contains(actionClass)) {
      result.actions.push(fields[i]);
    }
    if (fields[i].classList.contains(numberClass)) {
      result.numbers.push(fields[i]);
    }
  }

  return result;
}

export function getModel({ actions, numbers }) {
  const actionValues = actions.reduce(valueReducer(), []);
  const numberValues = numbers.reduce(valueReducer(Number), []);
  return actionValues
    .map((action, index) => ({
      action,
      number: numberValues[index]
    }))
    .filter(Boolean);
}

export function calculateResult(form, structureClasses) {
  const structure = getStructure(form, structureClasses);
  const model = getModel(structure);
  return model.reduce(resultReducer, Number(structure.initNumber.value));
}
