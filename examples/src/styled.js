/* @jsx glam */
import glam from 'glam';

const gutter = 15;

const reactBlue = 'rgb(97, 218, 251)';
const reactGray = 'rgb(40, 44, 52)';
const reactGrayDark = '#20232a';

// styled components
// ------------------------------

export const Container = props => (
  <div
    css={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 480,
      padding: '0 15px',
    }}
    {...props}
  />
);
export const Footer = props => (
  <div
    css={{
      backgroundColor: '#f7f7f7',
      borderTop: '1px solid #ececec',
      color: '#999',
      paddingBottom: '2em',
      paddingTop: '2em',
    }}
  >
    <Container style={{ display: 'flex ', justifyContent: 'space-between' }}>
      <span>
        by{' '}
        <a href="https://twitter.com/jossmackison" target="_blank">
          @jossmac
        </a>
      </span>
      <a href="https://github.com/jossmac/react-focus-marshal" target="_blank">
        github
      </a>
    </Container>
  </div>
);
export const Header = props => (
  <div
    css={{
      backgroundColor: reactGray,
      color: 'white',
      paddingBottom: '2em',
      paddingTop: '2em',
    }}
  >
    <Container>
      <div css={{ alignItems: 'flex-end', display: 'flex ' }}>
        <div
          css={{
            fontSize: 48,
            lineHeight: 1.1,
            marginRight: 12,
            marginLeft: -60,
          }}
          role="img"
          aria-label="Police Man Figure"
        >
          👮🏻
        </div>
        <h1
          css={{
            lineHeight: 1,
            margin: 0,
          }}
        >
          <small
            css={{
              color: '#00d8ff',
              display: 'block',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            React
          </small>
          Focus Marshal
        </h1>
      </div>
    </Container>
  </div>
);

export const Code = props => (
  <code
    css={{
      backgroundColor: 'rgba(255,229,100,0.2)',
      borderRadius: '3px',
      color: 'black',
      display: 'inline-block',
      fontFamily: 'Menlo, Monaco, monospace',
      fontSize: '0.85em',
      lineHeight: '1.4',
      margin: '0 -0.1em',
      padding: '0 0.4em',
      position: 'relative',
      zIndex: -1,
      verticalAlign: 'baseline',
    }}
    {...props}
  />
);

export const Kbd = props => (
  <code
    css={{
      backgroundColor: '#fafafa',
      borderBottomColor: '#c4c4c4',
      borderRadius: '3px',
      borderTopColor: '#cecece',
      border: '1px solid #ccc',
      boxShadow:
        '0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset',
      display: 'inline-block',
      fontFamily: 'Menlo, Monaco, monospace',
      fontSize: '0.85em',
      fontWeight: '700',
      lineHeight: 'inherit',
      padding: '1px 4px',
      position: 'relative',
      top: '-1px',
      whiteSpace: 'nowrap',
    }}
    {...props}
  />
);
