import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store/store";
import {
  googleAuth,
  checkGoogleAuthStatus,
  googleLogout,
  resetGoogleAuthStatus,
  clearGoogleUser,
} from "../Redux/Slicers/googleAuthSlice";

export const useGoogleAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const googleAuthState = useSelector((state: RootState) => state.googleAuth);

  const authenticateWithGoogle = (tokenCredential: string) => {
    return dispatch(googleAuth(tokenCredential));
  };

  const checkAuthStatus = () => {
    return dispatch(checkGoogleAuthStatus());
  };

  const logout = () => {
    return dispatch(googleLogout());
  };

  const resetStatus = () => {
    dispatch(resetGoogleAuthStatus());
  };

  const clearUser = () => {
    dispatch(clearGoogleUser());
  };

  return {
    // State
    user: googleAuthState.user,
    isAuthenticated: googleAuthState.isAuthenticated,
    loading: googleAuthState.loading,
    error: googleAuthState.error,
    success: googleAuthState.success,
    message: googleAuthState.message,

    // Actions
    authenticateWithGoogle,
    checkAuthStatus,
    logout,
    resetStatus,
    clearUser,
  };
};
