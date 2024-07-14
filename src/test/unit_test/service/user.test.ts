import Sinon from "sinon";
import expect from "expect";
import * as UserModel from "../../../model/users";
import * as UserService from "../../../service/users";
import { ConflictError, NotFoundError } from "../../../error/Errors";
import * as HashPassword from "../../../utils/hashPassword";
import { users } from "../../../data/users";

describe("User Service Test Suite", () => {
  /**Signup Test Cases */
  describe("signup", () => {
    let userModelSignupStub: Sinon.SinonStub;
    let userModelGetUserByEmail: Sinon.SinonStub;
    let utilsHashPassword: Sinon.SinonStub;
    beforeEach(() => {
      userModelSignupStub = Sinon.stub(UserModel, "signup");
      utilsHashPassword = Sinon.stub(HashPassword, "hashPassword");
      userModelGetUserByEmail = Sinon.stub(UserModel, "getUserByEmail");
    });
    afterEach(() => {
      userModelSignupStub.restore();
      userModelGetUserByEmail.restore();
      utilsHashPassword.restore();
    });

    it("Should create user", async () => {
      const user = {
        id: "0",
        name: "BIrendra Bohara",
        email: "ram@gmail.com",
        password: "kanchanpur1230",
        role: 1,
      };
      utilsHashPassword.returns("hashedPassword");
      userModelGetUserByEmail.returns(null);
      userModelSignupStub.returns(user);
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
      const user = {
        id: "0",
        name: "BIrendra Bohara",
        email: "ram@gmail.com",
        password: "kanchanpur1230",
        role: 1,
      };

      userModelGetUserByEmail.resolves(user);

      expect(async () => await UserService.signup(user)).rejects.toThrow(
        new ConflictError("Conflict: User already exist.")
      );
      expect(userModelGetUserByEmail.callCount).toBe(1);
      expect(userModelGetUserByEmail.getCall(0).args).toStrictEqual([
        user.email,
      ]);
    });
  });
  /**Get Users Test Case */
  describe("getUsers", () => {
    let userModelGetUsers: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUsers = Sinon.stub(UserModel, "getUsers");
    });
    afterEach(() => {
      userModelGetUsers.restore();
    });
    it("Should return all users", () => {
      const users = [
        {
          id: "0",
          name: "BIrendra Bohara",
          email: "birendra@gmail.com",
          password: "kanchanpur1230",
          role: 1,
        },
        {
          id: "1",
          name: "Ram Bohara",
          email: "ram@gmail.com",
          password: "ram123",
          role: 0,
        },
      ];
      userModelGetUsers.returns(users);
      const response = UserService.getUsers();
      expect(response).toStrictEqual(users);
      expect(userModelGetUsers.callCount).toBe(1);
      expect(userModelGetUsers.getCall(0).args).toStrictEqual([]);
    });
  });
  /**Get User By Email Test case */
  describe("getUserByEmail", () => {
    let userModelGetUserByEmail: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByEmail = Sinon.stub(UserModel, "getUserByEmail");
    });
    afterEach(() => {
      userModelGetUserByEmail.restore();
    });
    it("Should return user if user is found", () => {
      const user = {
        id: "0",
        name: "BIrendra Bohara",
        email: "birendra@gmail.com",
        password: "kanchanpur1230",
        role: 1,
      };
      userModelGetUserByEmail.returns(user);
      const response = UserService.getUserByEmail(user.email);
      expect(response).toStrictEqual(user);
      expect(userModelGetUserByEmail.callCount).toBe(1);
      expect(userModelGetUserByEmail.getCall(0).args).toStrictEqual([
        user.email,
      ]);
    });
    it("Should return null if user not found", () => {
      userModelGetUserByEmail.returns(null);
      const response = UserService.getUserByEmail("random@gmail.com");
      expect(response).toStrictEqual(null);
      expect(userModelGetUserByEmail.callCount).toBe(1);
      expect(userModelGetUserByEmail.getCall(0).args).toStrictEqual([
        "random@gmail.com",
      ]);
    });
  });
  /**getUserById Test Cases */
  describe("getUserById", () => {
    let userModelGetUserByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByIdStub = Sinon.stub(UserModel, "fetchUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });
    /**User found case */
    it("Should return user if user found", () => {
      const mockedUser = {
        id: "0",
        name: "test name",
        email: "test@gmail.com",
        password: "test",
        role: 0,
      };
      userModelGetUserByIdStub.returns(mockedUser);
      const response = UserService.fetchUserById("0");
      expect(response).toStrictEqual(mockedUser);
      expect(userModelGetUserByIdStub.callCount).toBe(1);
      expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["0"]);
    });

    /**User not found case */
    it("Should throw error if user is not found", () => {
      userModelGetUserByIdStub.returns(null);
      expect(() => UserService.fetchUserById("100")).toThrow(
        new NotFoundError("User with id 100 does not exist")
      );
      expect(userModelGetUserByIdStub.callCount).toBe(1);
      expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["100"]);
    });
  });
  /**Update User Test Case*/
  describe("updateUser", () => {
    let userModelUpdateUserStub: Sinon.SinonStub;
    let utilsHashPasswordStub: Sinon.SinonStub;
    let userModelGetUserByIdStub: Sinon.SinonStub;
    let usersDataStub: Sinon.SinonStub;
    beforeEach(() => {
      userModelUpdateUserStub = Sinon.stub(UserModel, "updateUser");
      utilsHashPasswordStub = Sinon.stub(HashPassword, "hashPassword");
      userModelGetUserByIdStub = Sinon.stub(UserModel, "fetchUserById");
      usersDataStub = Sinon.stub(users, "findIndex");
    });

    afterEach(() => {
      userModelUpdateUserStub.restore();
      utilsHashPasswordStub.restore();
      userModelGetUserByIdStub.restore();
      usersDataStub.restore();
    });

    it("Should update user", async () => {
      const userId = "1";
      const user = {
        id: userId,
        name: "Updated Name",
        email: "updatedemail@gmail.com",
        password: "newpassword",
        role: 1,
      };

      const existingUser = { ...user, password: "oldpassword" };
      const hashedPassword = "hashedPassword";
      const updatedUser = { ...user, password: hashedPassword };

      userModelGetUserByIdStub.resolves(existingUser);
      utilsHashPasswordStub.resolves("hashedPassword");
      userModelUpdateUserStub.returns(updatedUser);
      usersDataStub.returns(0);
      const response = await UserService.updateUser(userId, existingUser);
      expect(response).toStrictEqual(updatedUser);
      expect(userModelUpdateUserStub.callCount).toBe(1);
      expect(userModelUpdateUserStub.getCall(0).args).toStrictEqual([
        0,
        userId,
        updatedUser,
      ]);
    });
  });
  /**Delete user by id */
  describe("deleteUserById", ()=>{
    let userModelDeleteUserByIdStub: Sinon.SinonStub;
    beforeEach(()=>{
        userModelDeleteUserByIdStub = Sinon.stub(UserModel, "deleteUserById");
    });
    afterEach(()=>{
        userModelDeleteUserByIdStub.restore();
    });
    it("Should return success if user deleted successfully", ()=>{
        userModelDeleteUserByIdStub.returns("success");
        const response = UserService.deleteUserById("1");
        expect(response).toBe("success");
        expect(userModelDeleteUserByIdStub.callCount).toBe(1);
        expect(userModelDeleteUserByIdStub.getCall(0).args).toStrictEqual(["1"]);
    })
    it("Should return failure if user not delete", ()=>{
        userModelDeleteUserByIdStub.returns("failure");
        const response = UserService.deleteUserById("10");
        expect(response).toBe("failure");
        expect(userModelDeleteUserByIdStub.callCount).toBe(1);
        expect(userModelDeleteUserByIdStub.getCall(0).args).toStrictEqual(["10"]);
    })
  })
});
