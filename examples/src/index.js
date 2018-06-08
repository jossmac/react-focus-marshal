/* @jsx glam */
import glam from 'glam';
import React from 'react';
import { createPortal, render } from 'react-dom';
import { FocusTrap, FocusMarshal } from '../../src';
import { SiblingDemo, NestedDemo } from './Demos';
import './index.css';
import { Container, Code, Header, Footer, Kbd } from './styled';

class App extends React.Component {
  state = {
    visibleDemos: [],
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }
  addDemo = (name, activeType) => () => {
    const visibleDemos = this.state.visibleDemos.slice(0);
    visibleDemos.push(name);
    this.setState({ visibleDemos, activeType });
  };
  removeDemo = name => () => {
    const visibleDemos = this.state.visibleDemos.slice(0);
    visibleDemos.pop();
    this.setState({ visibleDemos });
  };
  getPortalTarget = ref => {
    this.portalTarget = ref;
  };
  onKeydown = event => {
    if (event.key !== 'Escape' || !this.state.visibleDemos.length) return;
    this.removeDemo()();
  };
  render() {
    const { visibleDemos, activeType } = this.state;

    return (
      <FocusMarshal>
        <div
          css={{
            display: 'flex ',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <div css={{ flex: 1, paddingBottom: 20 }}>
            <Container>
              <p css={{ color: '#888', fontSize: '1.4em', fontWeight: 300 }}>
                Trap focus within a DOM node; create accessible modal elements.
              </p>
              <p>
                Once a <Code>FocusTrap</Code> is mounted you won't be able to
                interact with elements outside of it. If a subsequent{' '}
                <Code>FocusTrap</Code> is mounted it will pause other active
                traps and take control of focus until it unmounts.
              </p>
              <SiblingDemo
                add={this.addDemo}
                remove={this.removeDemo}
                activeType={activeType}
                visibleDemos={visibleDemos}
              />
              <NestedDemo
                add={this.addDemo}
                remove={this.removeDemo}
                activeType={activeType}
                visibleDemos={visibleDemos}
              />
              <p>
                Hit <Kbd>esc</Kbd> to remove the last trap.
              </p>
            </Container>
          </div>
          <Footer />
        </div>
      </FocusMarshal>
    );
  }
}

render(<App />, document.getElementById('root'));
