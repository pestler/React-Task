import Link from 'next/link';

const Custom404 = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: 'red' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link legacyBehavior href="/">
        <a
          style={{
            fontSize: '1.5rem',
            color: 'blue',
            textDecoration: 'underline',
          }}
        >
          Go back to Home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
