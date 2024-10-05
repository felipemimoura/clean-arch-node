import { MissingParamError } from "../errors/missing-param-error";
import { SingUpController } from "./singup";

describe("SingUpController", () => {
  test("Should return 400 if no name is provided", () => {
    const sut = new SingUpController(); //System under test
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: "any_mail@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test("Should return 400 if no email is provided", () => {
    const sut = new SingUpController(); //System under test
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: "any_mail@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });
});
