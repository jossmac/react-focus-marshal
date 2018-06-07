// @flow

import React, {
  Component,
  type ElementRef,
  type ComponentType,
  type Node,
} from 'react';

const { Consumer, Provider } = React.createContext();
const NOOP = () => {};

type Callback = (ElementRef<*>) => void;
type Props = {
  children: Node,
};
type State = {
  traps: Array<*>,
};

export class FocusMarshal extends Component<Props, State> {
  state = { traps: [] };

  add = (ref: ElementRef<*>, cb: Callback = NOOP) => {
    const callback = () => cb(ref);

    this.setState(state => {
      const traps = state.traps.slice(0);

      // pause the last trap if it exists
      const lastIndex = traps.length - 1;
      if (lastIndex !== -1) {
        traps[lastIndex].trap.pause();
      }

      // activate the new trap and push into state
      ref.trap.activate();
      traps.push(ref);

      return { traps };
    }, callback);
  };
  remove = (ref: ElementRef<*>, cb: Callback = NOOP) => {
    const callback = () => cb(ref);

    this.setState(state => {
      const traps = state.traps.filter(trap => trap !== ref);

      // unpause the last trap if it exists
      const lastIndex = traps.length - 1;
      if (lastIndex !== -1) {
        traps[lastIndex].trap.unpause();
      }

      return { traps };
    }, callback);
  };
  render() {
    const { traps } = this.state;
    const { add, remove } = this;

    return (
      <Provider value={{ add, remove, traps }}>{this.props.children}</Provider>
    );
  }
}

export const FocusConsumer = ({ children }: { children: State => Node }) => (
  <Consumer>{context => children(context)}</Consumer>
);

export const withFocusMarshal = (Comp: ComponentType<*>) => (props: *) => (
  <FocusConsumer>
    {context => <Comp FocusMarshal={context} {...props} />}
  </FocusConsumer>
);
