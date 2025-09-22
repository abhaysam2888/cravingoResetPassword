import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  userID;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.userID;
  }

  async resetPassword(userId, secret, password) {
    try {
      return await this.account.updateRecovery({
        password: password,
        secret: secret,
        userId: userId,
      });
    } catch (error) {
      throw new Error(`Failed to resetPassword: ${error.message}`);
    }
  }
}

const authService = new AuthService();

export default authService;
