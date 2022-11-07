import * as request from "../utils/request";
import jwtDecode from "jwt-decode";
import { getProfile, setProfile, setToken } from "../persist/localstorage";
import { IDataApi } from "../types/dataApi";
import { delay } from "../utils";
import { IAccount } from "../models/account";
import { AccountDetails } from "../types/accounts";

export class AuthService {
  static async login(user: {
    username: string;
    password: string;
  }): Promise<IDataApi<string>> {
    const res = await request.post("auth/login", user);

    if (res.success) {
      setToken(res.data);
      const profile = jwtDecode(res.data) as any;
      setProfile(profile?.payload);
    }

    return res;
  }
  static async registerAccount(
    account: IAccount | AccountDetails
  ): Promise<IDataApi<AccountDetails>> {
    const res = await request.post("auth/register", account);
    if (res.success) {
      const { username, password } = res.data;

      this.login({ username, password });
    }
    return res;
  }
  static async editAccount(
    account: AccountDetails
  ): Promise<IDataApi<AccountDetails>> {
    return await request.put("accounts", account);
  }
  static async getProfile() {
    const res = await request.get("auth/profile", {});
    console.log(res);
  }
}
