import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../models/account";
import { getToken, removeToken } from "../../persist/localstorage";
import { AuthService } from "../../services/auth";

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (_, thunkApi) => {
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
    const userProfile = await AuthService.getProfile();
    console.log(userProfile);
    thunkApi.dispatch(updateProfile(userProfile));
    return true;
  } catch (e) {
    return false;
  }
});

export type IProfile = Omit<IAccount, "password">;

export interface IInitialState {
  loading: boolean;
  isAuthenticate: boolean;
  isInitialApp: boolean;
  userProfile?: IProfile;
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
    logout: (state) => {
      state.userProfile = undefined;
      removeToken();
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticate = action.payload;
    });
  },
});
export const { updateProfile, logout } = authSlice.actions;

export default authSlice.reducer;
