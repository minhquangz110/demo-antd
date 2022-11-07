import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getToken } from "../../persist/localstorage";
import { UserProfileService } from "../../services/userProfile";

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (_, thunkApi) => {
    return true;
    const token = getToken();
    if (token) {
      const isInitialApp = await thunkApi.dispatch(initialApp());
      if (isInitialApp) {
        return true;
      }
      return false;
    }
    return false;
  }
);

const initialApp = createAsyncThunk("auth/initialApp", async (_, thunkApi) => {
  try {
    const userProfile = await UserProfileService.getUserProfile();

    thunkApi.dispatch(updateProfile(userProfile));
    return true;
  } catch (e) {
    return false;
  }
});

export interface IUserProfile {
  name: string;
}

export interface IInitialState {
  loading: boolean;
  isAuthenticate: boolean;
  isInitialApp: boolean;
  userProfile?: IUserProfile;
}

const initialState: IInitialState = {
  loading: true,
  isAuthenticate: false,
  isInitialApp: false,
  userProfile: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    updateProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticate = action.payload;
    });
  },
});
export const { updateProfile } = authSlice.actions;

export default authSlice.reducer;
