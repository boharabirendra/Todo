import { TransactionFail } from "../error/Errors";
import { GetUserQuery, IUser } from "../interface/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  /**Create user */
  static async create(user: IUser) {
    try {
      const { email, name, password, roleId } = user;
      await this.queryBuilder().transaction(async (trx) => {
        await trx
          .insert({
            name,
            email,
            password,
          })
          .table("users");
        const recentCreatedUser = await trx
          .select("id")
          .table("users")
          .where({ email: user.email })
          .first();
        await trx
          .insert({ userId: recentCreatedUser.id, roleId })
          .table("role_user");
      });
    } catch (error) {
      throw new TransactionFail("DB operation failed");
    }
  }
  /**Update user */
  static async update(id: string, user: IUser) {
    const { name, email, password } = user;
    const userToUpdate = {
      name,
      email,
      password,
    };
    await this.queryBuilder().update(userToUpdate).table("users").where({ id });
  }

  /**Delete user */
  static async deleteUserById(id: string) {
     try {
      await this.queryBuilder().delete().table("users").where({ id });
     } catch (error) {
      throw new TransactionFail("DB operation failed")
     }
  }

  /**Fetch user by email */
  static getUserByEmail(email: string) {
    return this.queryBuilder()
      .select("id", "name", "email", "password")
      .table("users")
      .where({ email })
      .first();
  }

  /**Fetch user by email */
  static getUserById(id: string) {
    return this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .where({ id })
      .first();
  }

  /**Fetch permision by userId */
  static getPermissions(userId: number) {
    return this.queryBuilder()
      .select("permission_name")
      .from("permissions")
      .join(
        "role_permission",
        "permissions.id",
        "role_permission.permission_id"
      )
      .join("roles", "role_permission.role_id", "roles.id")
      .join("role_user", "roles.id", "role_user.role_id")
      .where("role_user.user_id", userId);
  }

  static getUsers(filter: GetUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }

  /**Fetch total number of users */
  static count(filter: GetUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}
