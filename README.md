# Admin Components

TODO:
- [ ] fix AdminInputState: grab states from our public API. (e.g. https://geo.tesseractcollective.com/states/US.json)
- [ ] fix AdminInputNationalId
- [ ] fix AdminInputDate by adding material UI dependencies 
- [ ] create example app


# Admin Form

Admin Form is a library that aids in creating forms using 2 tools:
- Prime React Components (https://www.primefaces.org/primereact/setup/)
- React Hook Form (https://react-hook-form.com/)

Admin Form has a number of input components that only require two props:
- name: string
- control: Control (from React Hook Form). NOTE: control is optional in Typescript due to the requirement of some parent components to provide it, but an error will be thrown at runtime if it's not provided