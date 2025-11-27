function LoginStatus({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </>
  );
}

export default LoginStatus;
