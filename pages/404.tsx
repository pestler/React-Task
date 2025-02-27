import { useRouter } from 'next/router';

const Page404 = () => {
  const router = useRouter();

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
        onClick={() => router.back()}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Page404;
