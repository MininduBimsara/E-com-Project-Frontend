import React, { useEffect } from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { googleAuth } from "../../Redux/Thunks/googleAuthThunks";

interface GoogleAuthButtonProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onSuccess,
  onError,
  buttonText = "Continue with Google",
  className = "",
  disabled = false,
}) => {
  const { authenticateWithGoogle, loading, error, success, user, resetStatus } =
    useGoogleAuth();

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // Render the button
      const buttonElement = document.getElementById("google-signin-button");
      if (buttonElement) {
        window.google.accounts.id.renderButton(buttonElement, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: "100%",
        });
      }
    }
  }, []);

  // Handle Google credential response
  const handleCredentialResponse = async (response: any) => {
    try {
      resetStatus(); // Clear any previous errors
      const result = await authenticateWithGoogle(response.credential);

      if (googleAuth.fulfilled.match(result)) {
        if (onSuccess) {
          onSuccess(result.payload.user);
        }
      } else if (googleAuth.rejected.match(result)) {
        if (onError) {
          onError(result.payload as string);
        }
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      if (onError) {
        onError("Google authentication failed");
      }
    }
  };

  // Handle manual Google sign-in (fallback)
  const handleManualGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className={`google-auth-container ${className}`}>
      {/* Google Sign-In Button */}
      <div id="google-signin-button" className="google-signin-button"></div>

      {/* Fallback button for manual trigger */}
      <button
        type="button"
        onClick={handleManualGoogleSignIn}
        disabled={disabled || loading}
        className="google-auth-fallback-btn"
        style={{ display: "none" }} // Hidden by default, shown if Google button fails
      >
        {loading ? "Signing in..." : buttonText}
      </button>

      {/* Error display */}
      {error && <div className="google-auth-error">{error}</div>}

      {/* Success message */}
      {success && (
        <div className="google-auth-success">
          Successfully signed in with Google!
        </div>
      )}
    </div>
  );
};

export default GoogleAuthButton;
