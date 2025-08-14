// AuthDebugger.tsx - Debug component for authentication issues
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store/hook";
import { verifyAuth } from "../../../Redux/Thunks/authThunks";

/**
 * Debug component to help troubleshoot authentication issues
 * This component shows the current auth state and allows manual verification
 */
export default function AuthDebugger() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  // Check for stored tokens and cookies
  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Function to get all cookies
  const getAllCookies = () => {
    return document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookies[name] = value;
      return cookies;
    }, {} as Record<string, string>);
  };

  const cookies = getAllCookies();
  const hasAuthCookies = Object.keys(cookies).some(
    (key) =>
      key.toLowerCase().includes("token") ||
      key.toLowerCase().includes("auth") ||
      key.toLowerCase().includes("session")
  );

  const handleVerifyAuth = () => {
   // console.log("🔍 [AuthDebugger] Manually triggering auth verification");
    dispatch(verifyAuth());
  };

  const handleClearTokens = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // console.log("🧹 [AuthDebugger] Stored tokens cleared");
    // console.log(
    //   "🧹 [AuthDebugger] Note: Cookies must be cleared by the backend"
    // );
    window.location.reload();
  };

  useEffect(() => {
    // console.log("🔍 [AuthDebugger] Component mounted");
    //  console.log("🔍 [AuthDebugger] Current auth state:", {
    //   user,
    //   isAuthenticated,
    //   loading,
    //   error,
    //   hasStoredToken: !!storedToken,
    //   hasAuthCookies,
    //   allCookies: Object.keys(cookies),
    // });
  }, [
    user,
    isAuthenticated,
    loading,
    error,
    storedToken,
    hasAuthCookies,
    cookies,
  ]);

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-4 max-w-sm z-50">
      <h3 className="font-bold text-yellow-800 mb-2">🔍 Auth Debugger</h3>

      <div className="text-sm space-y-1">
        <div>
          <strong>User:</strong> {user ? user.username : "None"}
        </div>
        <div>
          <strong>User ID:</strong> {user?.id || user?._id || "None"}
        </div>
        <div>
          <strong>User _id:</strong> {user?._id || "None"}
        </div>
        <div>
          <strong>Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}
        </div>
        <div>
          <strong>Loading:</strong> {loading ? "⏳ Yes" : "No"}
        </div>
        <div>
          <strong>Error:</strong> {error || "None"}
        </div>
        <div>
          <strong>Stored Token:</strong> {storedToken ? "✅ Yes" : "❌ No"}
        </div>
        {storedToken && (
          <div>
            <strong>Token Preview:</strong> {storedToken.substring(0, 20)}...
          </div>
        )}
        <div>
          <strong>Auth Cookies:</strong> {hasAuthCookies ? "✅ Yes" : "❌ No"}
        </div>
        {hasAuthCookies && (
          <div>
            <strong>Cookie Names:</strong>{" "}
            {Object.keys(cookies)
              .filter(
                (key) =>
                  key.toLowerCase().includes("token") ||
                  key.toLowerCase().includes("auth") ||
                  key.toLowerCase().includes("session")
              )
              .join(", ")}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        <button
          onClick={handleVerifyAuth}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Auth"}
        </button>

        <button
          onClick={handleClearTokens}
          className="w-full bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Clear Tokens
        </button>
      </div>
    </div>
  );
}
