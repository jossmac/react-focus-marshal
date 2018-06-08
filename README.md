# Focus Marshal

Traps focus within a DOM node — subsequently mounted traps will take control of focus and pause others until unmount.

### Install

```bash
yarn add react-focus-manager
```

### Use

You must wrap the applicable section of your app in the `FocusMarshal`, which provides context to the `FocusTrap` descendants.

```jsx
import { FocusTrap, FocusMarshal } from 'react-focus-marshal';

const Modal = () => createPortal(
  <FocusTrap>
    <div>
      {/* modal content */}
    </div>
  </FocusTrap>,
  document.body
);

const App = () => (
  <FocusMarshal>
    {someCondition ? <Modal /> : null}
  </FocusMarshal>
);
```

## FocusMarshal Props

| Property | Description |
| ------------- | ------------- |
| children `Node` | All children are passed through. |

## FocusTrap Props

| Property | Description |
| ------------- | ------------- |
| children <code>Element&lt;HTMLElement &#124; ComponentType&gt;</code> | A single element to trap focus within. The underlying DOM node will be resolved on the component passed as children. |
| Options `OptionsType` | The options object that is passed to `createFocusTrap`. See below for definition. |

#### Acknowledgement
The `FocusTrap` component is a thin wrapper around David Clark's fantastic [focus-trap](https://github.com/davidtheclark/focus-trap) library. Whilst react-focus-marshal attempts to maintain feature parity, there are some minor differences; see `fallbackFocus` property below.

### OptionsType

For brevity:
- `FocusTarget` is equal to `HTMLElement | string | () => HTMLElement`.
- `ActivationFn` is equal to `Ref => void`.

| Property | Description   |
| ------------- | -------------   |
| onActivate `ActivationFn` | A function that will be called when the focus trap activates.   |
| onDeactivate `ActivationFn` | A function that will be called when the focus trap deactivates. |
| initialFocus `FocusTarget` | Defaults to the first "tabbable" element -- a string value will be passed to `document.querySelector()`.|
| ~~fallbackFocus~~ `FocusTarget` | The required `children` element is used as a safe way to fulfill the contract with "focus-trap". |
| escapeDeactivates `boolean` | Default: `true`. If false, the Escape key will not trigger deactivation of the focus trap. |
| clickOutsideDeactivates `boolean` | Default: `false`. If true, a click outside the focus trap will deactivate the focus trap and allow the click event to do its thing. |
| returnFocusOnDeactivate `boolean` | Default: `true`. If false, when the trap is deactivated, focus will not return to the element that had focus before activation. |

## Alternatives

This library may not meet your needs. Here are some alternative I came across whilst searching for this solution:

- https://github.com/davidtheclark/focus-trap
- https://github.com/davidtheclark/focus-trap-react
- https://github.com/theKashey/react-focus-lock
- https://github.com/vigetlabs/react-focus-trap
