import Sinon from "sinon";
import expect from "expect";
import * as UserModel from "../../../model/users";
import * as UserService from "../../../service/users";
import * as HashPassword from "../../../utils/hashPassword";
import { GetUserQuery } from "../../../interface/user";
import { ApiError } from "../../../utils/ApiError";
import HttpStatusCode from "http-status-codes";

describe("User Service Test Suite", () => {
  const user = {
    id: 10,
    name: "BIrendra Bohara",
    email: "ramduplicate@gmail.com",
    password: "Kanchanpur1230@",
    roleId: 2,
  };
  const filter: GetUserQuery = { size: 4, page: 1 };
  /**Signup Test Cases */
  describe("signup", () => {
    let userModelSignupStub: Sinon.SinonStub;
    let userModelGetUserByEmail: Sinon.SinonStub;
    let utilsHashPassword: Sinon.SinonStub;
    beforeEach(() => {
      userModelSignupStub = Sinon.stub(UserModel.UserModel, "create");
      userModelGetUserByEmail = Sinon.stub(
        UserModel.UserModel,
        "getUserByEmail"
      );
      utilsHashPassword = Sinon.stub(HashPassword, "hashPassword");
    });
    afterEach(() => {
      userModelSignupStub.restore();
      userModelGetUserByEmail.restore();
      utilsHashPassword.restore();
    });

    it("Should create user", async () => {
      utilsHashPassword.resolves("hashedPassword");
      userModelGetUserByEmail.resolves(null);
      userModelSignupStub.resolves(user);
      await UserService.signup(user);
      expect(utilsHashPassword.callCount).toBe(1);
      expect(utilsHashPassword.getCall(0).args).toStrictEqual([user.password]);
      expect(userModelSignupStub.callCount).toBe(1);
      expect(userModelSignupStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
    it("Should throw conflict error if user already exist", async () => {
      userModelGetUserByEmail.returns(user);
      expect(async () => await UserService.signup(user)).rejects.toThrow(
        new ApiError(
          HttpStatusCode.CONFLICT,
          `User with email ${user.email} already exist`
        )
      );
      expect(userModelGetUserByEmail.callCount).toBe(1);
      expect(userModelGetUserByEmail.getCall(0).args).toStrictEqual([
        user.email,
      ]);
    });
  });
  //   /**Get Users Test Case */
  describe("getUsers", () => {
    let userModelGetUsers: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUsers = Sinon.stub(UserModel.UserModel, "getUsers");
    });
    afterEach(() => {
      userModelGetUsers.restore();
    });
    it("Should return all users", async () => {
      const users = [
        user,
        {
          id: "2",
          name: "Ram Bohara",
          email: "ram@gmail.com",
          password: "ram123",
          roleId: 2,
        },
      ];
      userModelGetUsers.resolves(users);
      const response = await UserService.getUsers(filter);
      expect(response).toBe(users);
      expect(userModelGetUsers.callCount).toBe(1);
      expect(userModelGetUsers.getCall(0).args).toStrictEqual([filter]);
    });
    it("Should throw error if users not found", () => {
      const users = [];
      userModelGetUsers.resolves(users);
      expect(async () => await UserService.getUsers(filter)).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `Users not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });

  //   /**Get User By Email Test case */
  describe("getUserByEmail", () => {
    let userModelGetUserByEmail: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByEmail = Sinon.stub(
        UserModel.UserModel,
        "getUserByEmail"
      );
    });
    afterEach(() => {
      userModelGetUserByEmail.restore();
    });
    it("Should return user if user is found", async () => {
      const user = {
        id: "0",
        name: "BIrendra Bohara",
        email: "birendra@gmail.com",
        password: "kanchanpur1230",
        role: 1,
      };
      userModelGetUserByEmail.returns(user);
      const response = await UserService.getUserByEmail(user.email);
      expect(response).toStrictEqual(user);
      expect(userModelGetUserByEmail.callCount).toBe(1);
      expect(userModelGetUserByEmail.getCall(0).args).toStrictEqual([
        user.email,
      ]);
    });
    it("Should return null if user not found", () => {
      userModelGetUserByEmail.returns(null);
      expect(
        async () => await UserService.getUserByEmail(user.email)
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `User with email ${user.email} not found`,
          "NOT FOUND"
        )
      );
    });
  });
  //   /**getUserById Test Cases */
  describe("getUserById", () => {
    let userModelGetUserByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByIdStub = Sinon.stub(UserModel.UserModel, "getUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });
    /**User found case */
    it("Should return user if user found", async () => {
      const mockedUser = {
        id: "1",
        name: "test name",
        email: "test@gmail.com",
        password: "test",
        roleId: 1,
      };
      userModelGetUserByIdStub.returns(mockedUser);
      const response = await UserService.getUserById("1");
      expect(response).toStrictEqual(mockedUser);
      expect(userModelGetUserByIdStub.callCount).toBe(1);
      expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["1"]);
    });

    /**User not found case */
    it("Should throw error if user is not found", () => {
      userModelGetUserByIdStub.returns(null);
      expect(() => UserService.getUserById("100")).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `User with id 100 not found`,
          "NOT FOUND ERROR"
        )
      );
      expect(userModelGetUserByIdStub.callCount).toBe(1);
      expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["100"]);
    });
  });

  //   /**Update User Test Case*/
  describe("updateUser", () => {
    let userModelUpdateUserStub: Sinon.SinonStub;
    let utilsHashPasswordStub: Sinon.SinonStub;
    let userModelGetUserByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      userModelUpdateUserStub = Sinon.stub(UserModel.UserModel, "update");
      utilsHashPasswordStub = Sinon.stub(HashPassword, "hashPassword");
      userModelGetUserByIdStub = Sinon.stub(UserModel.UserModel, "getUserById");
    });

    afterEach(() => {
      userModelUpdateUserStub.restore();
      utilsHashPasswordStub.restore();
      userModelGetUserByIdStub.restore();
    });

    it("Should update user", async () => {
      const existingUser = { ...user, password: "oldpassword" };
      const hashedPassword = "hashedPassword";
      const updatedUser = { ...user, password: hashedPassword };
      userModelGetUserByIdStub.resolves(existingUser);
      utilsHashPasswordStub.resolves("hashedPassword");
      userModelUpdateUserStub.resolves(updatedUser);
      const response = await UserService.updateUser("2", user);
      expect(response).toStrictEqual(updatedUser);
      expect(userModelUpdateUserStub.callCount).toBe(1);
      expect(userModelUpdateUserStub.getCall(0).args).toStrictEqual([
        "2",
        updatedUser,
      ]);
    });
  });
  //   /**Delete user by id */
  describe("deleteUserById", () => {
    let userModelDeleteUserByIdStub: Sinon.SinonStub;
    let userModelGetUserByIdStub: Sinon.SinonStub;

    beforeEach(() => {
      userModelDeleteUserByIdStub = Sinon.stub(
        UserModel.UserModel,
        "deleteUserById"
      );
      userModelGetUserByIdStub = Sinon.stub(UserModel.UserModel, "getUserById");
    });
    afterEach(() => {
      userModelDeleteUserByIdStub.restore();
      userModelGetUserByIdStub.restore();
    });
    it("Should return success if user deleted successfully", async () => {
      userModelGetUserByIdStub.resolves("success");
      const response = await UserService.deleteUserById("10");
      expect(response).toBe("success");
      expect(userModelDeleteUserByIdStub.callCount).toBe(1);
      expect(userModelDeleteUserByIdStub.getCall(0).args).toStrictEqual(["10"]);
    });
    it("Should return failure if user not delete", async () => {
      userModelDeleteUserByIdStub.resolves(null);
      expect(
        async () => await UserService.deleteUserById("100")
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `User with id 100 not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });
});
