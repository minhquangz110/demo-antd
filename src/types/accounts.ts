import { IAccount } from "../models/account";

export type AccountDetails = Omit<IAccount,'password'>;
