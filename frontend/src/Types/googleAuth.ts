// Google Authentication Types
export interface GoogleUser {
  id: string;
  username: string;
  email: string;
  role: string;
  googleId?: string;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  // Add other user fields as needed
}

export interface GoogleAuthResponse {
  user: GoogleUser;
  token?: string;
  message?: string;
}

export interface GoogleAuthState {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

export interface GoogleAuthConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

export interface GoogleButtonOptions {
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "rounded" | "pill" | "circle" | "square";
  width?: string | number;
  locale?: string;
}
