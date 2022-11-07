import * as request from "../utils/request";
import { v4 as uuidv4 } from "uuid";

import { IDataApi } from "../types/dataApi";
import { DataList } from "../types/dataListApi";
import { AccountDetails } from "../types/accounts";
import jwtDecode from "jwt-decode";
import { getToken, setProfile, setToken } from "../persist/localstorage";
import { IAccount } from "../models/account";

export class accountService {
  static async getAccounts(page?: {
    page: number;
    limit: number;
  }): Promise<DataList<AccountDetails[]>> {
    const result = await request.get("accounts", page);
    return result;
  }

  static async del(id: string): Promise<IDataApi<string>> {
    const _id = { id: id };
    const result = await request.del("accounts", _id);
    return result;
  }

  static async registerAccount(
    account: IAccount | AccountDetails
  ): Promise<IDataApi<AccountDetails>> {
    // const pathsRes = await request.upload("accounts/upload", account.imgs);

    // if (pathsRes.success === true) {
    //   account.imgs = pathsRes.data;
    // }

    const res = await request.post("auth/register", account);

    return res;
  }
  static async update(
    account: AccountDetails
  ): Promise<IDataApi<AccountDetails>> {
    const res = await request.put("accounts", account);
    if (res.success) {
      setProfile(res.data);
    }
    return res;
  }
}
