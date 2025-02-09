import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1
        style={{
          color: 'red',
          fontSize: '44px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        404 - Page Not Found
      </h1>
      <button
        className="btn"
        onClick={() => navigate(-1)}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Назад
      </button>
    </div>
  );
};

export default NotFoundPage;
