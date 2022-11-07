import { delay } from "../utils";

export class UserProfileService {
  static async getUserProfile() {
    await delay(500);
    return {
      name: "coc",
    };
  }
}
