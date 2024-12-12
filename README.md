# Work In Progress !!!

# React Stateless Form

React Stateless Form is a form library to create a from in React.

Features:

- State of the form can be internal (held by RSF) or external (held, for example, in Redux)
- Do not depend on context (althrough it can be used)
- Typesafe as much as possible (it is developed in TypeScript)
- Customizable. Internal begavior of the form can be changed
- Ability to create Subforms
- Built-in loader component
- Partial state updates. Object that contains updated field is changed.
  For example
  ```jsx
  const values = {
    user: { name: "John" },
    address: { city: "London" },
  };
  ```
  If `name` is updated, `user` and `values` will be changed. `address` will not change.
  This means that `useEffect` subscribed to `user` ir `values` will fire, but `useEffect` subscribed to `address` will not.
- Setter functions accept values or callbacks. `setFieldValue: (name: Name, value: (Values | (prev: Value) => Value))

[Documentation]()
[Examples]()
