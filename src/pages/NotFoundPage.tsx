import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1
        style={{
          color: 'red',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        404 - Page Not Found
      </h1>
    </div>
  );
};

export default NotFoundPage;
