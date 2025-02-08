import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth({ user, setUser }) {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="text-center mt-10">
      {user ? (
        <>
          <p className="mb-2">Welcome, {user.displayName}</p>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </>
      ) : (
        <button onClick={login} className="px-4 py-2 bg-blue-500 text-white rounded">
          Sign in with Google
        </button>
      )}
    </div>
  );
}
