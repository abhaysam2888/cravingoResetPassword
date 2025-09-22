import { Client, Account } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    if (!conf.appwriteUrl || !conf.appwriteProjectId) {
      throw new Error("Appwrite configuration is missing or invalid.");
    }

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  /**
   * Reset user password using recovery secret
   * @param {string} userId
   * @param {string} secret
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async resetPassword(userId, secret, password) {
    if (!userId || !secret || !password) {
      throw new Error("Missing required parameters for password reset.");
    }

    try {
      return await this.account.updateRecovery({
        userId,
        secret,
        password,
      });
    } catch (error) {
      // More detailed error messages
      if (error.response) {
        throw new Error(
          `Appwrite Error (${error.response.code}): ${error.response.message}`
        );
      } else {
        throw new Error(`Failed to reset password: ${error.message}`);
      }
    }
  }
}

const authService = new AuthService();
export default authService;
