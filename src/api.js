// Outside of the task scope
// No need to edit
// Just a mock, will be real a call in real environment
export function addNewUrl() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 500);
  });
}
