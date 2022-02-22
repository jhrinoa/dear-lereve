import { useProtectedMutation } from "../../app/services/auth";

const AdminPage = () => {
  const [attemptAccess, { data, error, isLoading }] = useProtectedMutation();

  return (
    <div>
      <button onClick={() => attemptAccess()} isLoading={isLoading}>
        Make an authenticated request
      </button>
      <div>
        {data ? (
          <>
            Data:
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </>
        ) : error ? (
          <>
            Error: <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AdminPage;
