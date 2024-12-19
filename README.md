# Work In Progress !!!

[![npm version](https://img.shields.io/npm/v/react-flexible-form.svg?style=flat-square)](https://www.npmjs.com/package/react-flexible-form)
[![npm downloads](https://img.shields.io/npm/dm/react-flexible-form.svg?style=flat-square)](https://www.npmjs.com/package/react-flexible-form)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ffyodor-e%2Freact-flexible-form%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/fyodor-e/react-flexible-form/goto?ref=main)
[![codecov](https://codecov.io/gh/fyodor-e/react-flexible-form/branch/main/graph/badge.svg)](https://codecov.io/gh/fyodor-e/react-flexible-form)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=fyodor-e/react-flexible-form)](https://dependabot.com)
<br />

# React Flexible Form

React Flexible Form is a form library to create a from in React.

Features:

- State of the form can be internal (held by RFF) or external (held, for example, in Redux)
- Do not depend on context (althrough it can be used)
- Typesafe as much as possible (it is developed in TypeScript)
- Customizable. Internal begavior of the form can be changed
- Ability to create Subforms
- Built-in loader component
- Partial state updates. Only object that contains updated field is changed.
- Setter functions accept values or callbacks. `setFieldValue: (name: Name, value: (Values | (prev: Value) => Value))`

<br />
For form validation see [React Flexible Form Resolvers](https://www.npmjs.com/package/react-flexible-form-resolvers)

### Install

```jsx
 npm i react-flexible-form
```

### Usage

```jsx
import { useCallback } from 'react';
import { Field, OnSubmit, useForm } from 'react-flexible-form'

type Values = {
  firstName: string,
  lastName: string,
}

export default function SomeForm () {
  const onSubmit = useCallback<OnSubmit<Values>>(
    ({ formControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const formControl = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit,
  })

  return (
    <div
      style={{
        gap: "7px",
        display: "flex",
        flexDirection: "column",
        width: '100%',
        alignItems: 'center',
      }}
    >
      <label>First Name</label>
      <Field
        rffFormControl={formControl}
        rffName="firstName"
        rffComponent="input"
      />
      <label>Last Name</label>
      <Field
        rffFormControl={formControl}
        rffName="lastName"
        rffComponent="input"
      />
      {!formControl.isValid && (
        <>
          <div style={{ color: "red" }}>Form have errors:</div>
          <div style={{ color: "red" }}>{JSON.stringify(formControl.errors)}</div>
        </>
      )}
      <button onClick={formControl.handleSubmit}>
        Submit
      </button>
    </div>
  )
}
```

[Documentation](https://fyodor-e.github.io/react-flexible-form/#/getting-started/overview)
<br />
[Examples](https://fyodor-e.github.io/react-flexible-form/#/examples/)
