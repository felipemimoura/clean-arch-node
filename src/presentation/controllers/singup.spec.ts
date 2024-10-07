import { MissingParamError, InvalidParamError, ServerError } from "../errors";
import { SingUpController } from "./singup";
import { EmailValidator } from "../protocols";

interface SutType {
  sut: SingUpController;
  emailValidatorStub: EmailValidator;
}

//Factory
const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new SingUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeEmailValidatorWhithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      throw new Error();
    }
  }

  return new EmailValidatorStub();
};

describe("SingUpController", () => {
  test("Should return 400 if no name is provided", () => {
    const { sut } = makeSut(); //System under test
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
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", () => {
    const { sut } = makeSut(); //System under test
    const httpRequest = {
      body: {
        name: "any_name",
        // email: "any_mail@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const { sut } = makeSut(); //System under test
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_mail@mail.com",
        // password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no passwordConfirmation is provided", () => {
    const { sut } = makeSut(); //System under test
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_mail@mail.com",
        password: "any_password",
        // passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if no passwordConfirmation is provided", () => {
    const { sut } = makeSut(); //System under test
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_mail@mail.com",
        password: "any_password",
        // passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if an invalid is provided", () => {
    const { sut, emailValidatorStub } = makeSut(); //System under test

    //Change value to reuurn a function
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut(); //System under test

    //Change value to reuurn a function
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should return 500 if EmailValidator throws", () => {
    const emailValidatorStub = makeEmailValidatorWhithError();
    const sut = new SingUpController(emailValidatorStub);

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
