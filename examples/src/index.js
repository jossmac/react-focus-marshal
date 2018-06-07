/* @jsx glam */
import glam from 'glam';
import React from 'react';
import { createPortal, render } from 'react-dom';
import { FocusTrap, FocusMarshal } from '../../src';
import './index.css';
import { Code } from './styled';

const styles = {
  fontFamily: 'sans-serif',
  margin: '0 auto',
  maxWidth: 420,
  padding: '0 20px',
};

const DemoGroup = ({ innerRef, ...props }) =>
  createPortal(
    <div
      css={{
        alignItems: 'center',
        display: 'flex ',
        justifyContent: 'center',

        '@media (max-width: 480px)': {
          flexDirection: 'column',
        },
      }}
      ref={innerRef}
      {...props}
    />,
    document.body
  );
const Demo = ({ children, portalTarget, title, ...props }) =>
  createPortal(
    <FocusTrap {...props}>
      <div
        className="demo"
        css={{
          background: 'white',
          borderRadius: 4,
          border: '2px solid #DFE1E5',
          boxSizing: 'border-box',
          margin: 10,
          width: 200,
          padding: 10,

          '@media (max-width: 480px)': {
            width: 'calc(100% - 20px)',
          },

          ':focus-within': {
            borderColor: '#2684FF',
            boxShadow: '0 0 0 5px #DEEBFF',
          },
        }}
        {...props}
      >
        <h4 css={{ marginTop: 0 }}>{title}</h4>
        {children}
      </div>
    </FocusTrap>,
    portalTarget
  );

class App extends React.Component {
  state = {
    visibleDemos: [],
  };
  addDemo = name => () => {
    const visibleDemos = this.state.visibleDemos.slice(0);
    visibleDemos.push(name);
    this.setState({ visibleDemos });
  };
  removeDemo = name => () => {
    const visibleDemos = this.state.visibleDemos.filter(f => f !== name);
    this.setState({ visibleDemos });
  };
  getPortalTarget = ref => {
    this.portalTarget = ref;
  };
  render() {
    const { visibleDemos } = this.state;

    return (
      <div>
        <FocusMarshal>
          <div style={styles}>
            <h1>👮🏻 React Focus Marshal</h1>
            <p>
              Traps focus within a DOM node &mdash; subsequently mounted traps
              will pause others and take focus responsibility until they
              unmount.
            </p>
            <p>
              <a
                href="https://github.com/jossmac/react-focus-marshal"
                target="_blank"
              >
                github
              </a>
              <span> &middot; </span>
              <a
                href="https://www.npmjs.com/package/react-focus-marshal"
                target="_blank"
              >
                npm
              </a>
            </p>
            <p>
              Once a <Code>FocusTrap</Code> is mounted you won't be able to
              interact with elements outside of the focus trap; see it in action
              below.
            </p>

            <p>
              <button onClick={this.addDemo('one')}>Add FocusLock</button>
            </p>
            {visibleDemos.includes('one') ? (
              <Demo portalTarget={this.portalTarget} title="One">
                <button onClick={this.removeDemo('one')}>Remove</button>
                <button onClick={this.addDemo('two')}>Add FocusLock</button>
              </Demo>
            ) : null}

            {visibleDemos.includes('two') ? (
              <Demo portalTarget={this.portalTarget} title="Two">
                <button onClick={this.removeDemo('two')}>Remove</button>
                <button onClick={this.addDemo('three')}>Add FocusLock</button>
              </Demo>
            ) : null}

            {visibleDemos.includes('three') ? (
              <Demo portalTarget={this.portalTarget} title="Three">
                <button onClick={this.removeDemo('three')}>Remove</button>
              </Demo>
            ) : null}
          </div>
        </FocusMarshal>
        <DemoGroup innerRef={this.getPortalTarget} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
