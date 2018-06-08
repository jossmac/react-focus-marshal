/* @jsx glam */
import glam from 'glam';
import React, { Fragment } from 'react';
import { createPortal, render } from 'react-dom';
import { FocusTrap, FocusMarshal } from '../../src';

const DemoGroup = ({ innerRef, ...props }) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex ',
      justifyContent: 'center',
      marginLeft: -8,
      marginRight: -8,

      '@media (max-width: 480px)': {
        flexDirection: 'column',
      },
    }}
    ref={innerRef}
    {...props}
  />
);
const DemoBox = ({ highlightFocus, ...props }) => {
  const focusWithingStyles = highlightFocus
    ? {
        ':focus-within': {
          // backgroundColor: 'rgba(255,229,100,0.2)',
          backgroundColor: 'rgba(97, 218, 251,0.2)',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)',
        },
      }
    : null;
  return (
    <div
      css={{
        borderRadius: 4,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
        flex: 1,
        margin: 8,
        padding: 10,
        position: 'relative',
        ...focusWithingStyles,
      }}
      {...props}
    />
  );
};
const Demo = ({ children, portalTarget, title, ...props }) => {
  const content = (
    <FocusTrap options={{ escapeDeactivates: false }} {...props}>
      <DemoBox highlightFocus {...props}>
        <h5 css={{ marginTop: 0 }}>{title}</h5>
        {children}
      </DemoBox>
    </FocusTrap>
  );

  return portalTarget ? createPortal(content, portalTarget) : content;
};

function upCase(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export const SiblingDemo = ({ add, remove, activeType, visibleDemos }) => {
  const demoType = 'siblings';
  return (
    <Fragment>
      <h3>Siblings</h3>
      {visibleDemos.length && activeType === demoType ? null : (
        <DemoGroup>
          <DemoBox>
            <button onClick={add('one', demoType)} autoFocus>
              Create Trap
            </button>
          </DemoBox>
        </DemoGroup>
      )}
      {demoType === activeType ? (
        <DemoGroup>
          {visibleDemos.includes('one') ? (
            <Demo title="One">
              <button onClick={remove('one')}>remove</button>
              <button onClick={add('two', demoType)}>add</button>
            </Demo>
          ) : null}

          {visibleDemos.includes('two') ? (
            <Demo title="Two">
              <button onClick={remove('two')}>remove</button>
              <button onClick={add('three', demoType)}>add</button>
            </Demo>
          ) : null}

          {visibleDemos.includes('three') ? (
            <Demo title="Three">
              <button onClick={remove('three')}>done</button>
            </Demo>
          ) : null}
        </DemoGroup>
      ) : null}
    </Fragment>
  );
};

export const NestedDemo = ({ add, remove, activeType, visibleDemos }) => {
  const demoType = 'nested';
  return (
    <Fragment>
      <h3>Nested</h3>
      {visibleDemos.length && activeType === demoType ? null : (
        <DemoGroup>
          <DemoBox>
            <button onClick={add('one', demoType)} autoFocus>
              Create Trap
            </button>
          </DemoBox>
        </DemoGroup>
      )}
      {demoType === activeType ? (
        <DemoGroup>
          {visibleDemos.includes('one') ? (
            <Demo title="One">
              <button onClick={remove('one')}>remove</button>
              <button onClick={add('two', demoType)}>add</button>

              {visibleDemos.includes('two') ? (
                <Demo title="Two">
                  <button onClick={remove('two')}>remove</button>
                  <button onClick={add('three', demoType)}>add</button>

                  {visibleDemos.includes('three') ? (
                    <Demo title="Three">
                      <button onClick={remove('three')}>done</button>
                    </Demo>
                  ) : null}
                </Demo>
              ) : null}
            </Demo>
          ) : null}
        </DemoGroup>
      ) : null}
    </Fragment>
  );
};
