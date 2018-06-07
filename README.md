# Focus Marshal

Traps focus within a DOM node — subsequently mounted traps will pause others and take focus responsibility until they unmount.

```jsx
import HeightTransition from 'react-focus-marshal';

const AnimatedAlert = ({ isOpen, ...rest }) => (
  <HeightTransition initial={0}>
    {isOpen ? <Alert {...rest} /> : null}
  </HeightTransition>
);
```
