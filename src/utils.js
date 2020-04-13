export function getValues(
  form,
  initNumberClassName,
  actionClassName,
  numberClassName
) {
  const inputs = form.elements;
  const result = {
    actions: [],
    numbers: [],
  };

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].classList.contains(initNumberClassName)) {
      continue; // skip initial
    }
    if (inputs[i].classList.contains(numberClassName)) {
      result.actions.push(inputs[i]);
    }
    if (inputs[i].classList.contains(numberClassName)) {
      result.numbers.push(inputs[i]);
    }
  }

  return result;
}
