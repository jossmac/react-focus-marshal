// @flow

import React, { Component, type Element } from 'react';
import createFocusTrap from 'focus-trap';
import NodeResolver from 'react-node-resolver';

import { withFocusMarshal } from './FocusMarshal';

type Fn = (*) => void;
export type FocusTarget = HTMLElement | string | Fn;
type Options = {
  /* A function that will be called when the focus trap activates. */
  onActivate?: Fn,
  /* A function that will be called when the focus trap deactivates */
  onDeactivate?: Fn,
  /*
    By default, when a focus trap is activated the first element in the focus
    trap's tab order will receive focus. With this option you can specify a
    different element to receive that initial focus. Can be a DOM node, or a
    selector string (which will be passed to document.querySelector() to find
    the DOM node), or a function that returns a DOM node.
  */
  initialFocus?: FocusTarget,
  /*
    By default, an error will be thrown if the focus trap contains no elements
    in its tab order. With this option you can specify a fallback element to
    programmatically receive focus if no other tabbable elements are found.
    For example, you may want a popover's <div> to receive focus if the
    popover's content includes no tabbable elements. Make sure the fallback
    element has a negative tabindex so it can be programmatically focused. The
    option value can be a DOM node, a selector string (which will be passed to
    document.querySelector() to find the DOM node), or a function that returns
    a DOM node.
  */
  fallbackFocus?: FocusTarget,
  /*
    Default: false. If true, the Escape key will trigger deactivation of
    the focus trap.
  */
  escapeDeactivates?: boolean,
  /*
    Default: false. If true, a click outside the focus trap will deactivate the
    focus trap and allow the click event to do its thing.
  */
  clickOutsideDeactivates?: boolean,
  /*
    Default: true. If false, when the trap is deactivated, focus will not
    return to the element that had focus before activation.
  */
  returnFocusOnDeactivate?: boolean,
};
type Props = {
  children: Element<*>,
  FocusMarshal?: Component<*>,
  options: Options,
};

export class IndependentFocusTrap extends Component<Props> {
  boundary: HTMLElement;
  mergedOptions: Options;
  trap: Object;
  previouslyFocusedElement: HTMLElement;
  static defaultProps = {
    options: {},
  };
  componentWillMount() {
    // this must be captured before mount, as the trap will alter the `activeElement`
    if (document && document.activeElement) {
      this.previouslyFocusedElement = document.activeElement;
    }
  }

  componentDidMount() {
    const { FocusMarshal, options } = this.props;

    // update the focus manager state
    if (FocusMarshal) FocusMarshal.add(this);

    // Objects as defaultProps don't merge, set and spread here instead
    const defaultOptions = {
      fallbackFocus: this.boundary,
      returnFocusOnDeactivate: true,
    };

    this.mergedOptions = { ...defaultOptions, ...options };
    this.trap = createFocusTrap(this.boundary, this.mergedOptions);

    // if the trap isn't inside
    if (!FocusMarshal) {
      this.trap.activate();
    }
  }

  componentWillUnmount() {
    const { FocusMarshal } = this.props;

    // update the focus manager state
    if (FocusMarshal) {
      FocusMarshal.remove(this);
    }

    // deactivate this trap
    this.trap.deactivate();

    if (
      this.mergedOptions.returnFocusOnDeactivate &&
      this.previouslyFocusedElement &&
      this.previouslyFocusedElement.focus
    ) {
      this.previouslyFocusedElement.focus();
    }
  }

  getBoundary = (ref: HTMLElement) => {
    this.boundary = ref;
  };

  render() {
    return (
      <NodeResolver innerRef={this.getBoundary}>
        {this.props.children}
      </NodeResolver>
    );
  }
}
export default withFocusMarshal(IndependentFocusTrap);
