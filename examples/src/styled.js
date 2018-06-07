/* @jsx glam */
import glam from 'glam';

const gutter = 15;

// styled components
// ------------------------------

export const Container = props => (
  <div
    css={{
      display: 'flex ',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 410,
      padding: '60px 15px',
      textAlign: 'center',
    }}
    {...props}
  />
);

export const Repo = ({ isLocked, ...props }) => (
  <a
    target="_blank"
    css={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
      color: 'inherit',
      paddingBottom: 1,
      textDecoration: 'none',

      ':hover': {
        borderBottomColor: 'rgba(0, 0, 0, 0.6)',
        textDecoration: 'none',
      },
    }}
    {...props}
  />
);

/*
  ==============================
  Misc.
  ==============================
*/

export const Header = props => (
  <header css={{ marginBottom: '2em' }} {...props} />
);
export const Footer = props => <footer css={{ fontSize: 14 }} {...props} />;
export const Icon = props => (
  <div
    css={{
      fontSize: 64,
      height: 64,
      lineHeight: 1,
      margin: '0 auto 0.5em',
      position: 'relative',
      width: 64,
    }}
    {...props}
  />
);
export const Title = props => (
  <h1
    css={{
      display: 'inline',
      fontSize: 'inherit',
      fontWeight: 500,
      letterSpacing: '-0.025em',
      margin: 0,
    }}
    {...props}
  />
);
export const Code = props => (
  <code
    css={{
      backgroundColor: '#FFEBE5',
      borderRadius: '3px',
      color: '#BF2600',
      display: 'inline-block',
      fontFamily: 'Monaco',
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
