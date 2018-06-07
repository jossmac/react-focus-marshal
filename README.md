# Focus Marshal

Traps focus within a DOM node — subsequently mounted traps will pause others and take focus responsibility until they unmount.

```jsx
import { FocusTrap, FocusMarshal } from 'react-focus-marshal';

const Modal = () => (
  <FocusTrap>
    <div>
      {/* modal content */}
    </div>
  </FocusTrap>
);

const App = () => (
  <FocusMarshal>
    <Modal />
  </FocusMarshal>
);
```
