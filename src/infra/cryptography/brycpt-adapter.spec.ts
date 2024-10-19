import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypte addpater", () => {
  test("Should call bycript with correct values", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });
  test("Should return a hash on success", async () => {
    const sut = makeSut();

    const result = await sut.encrypt("any_value");

    expect(result).toBe("hash");
  });

  test("Should throws if brcypt thrws", async () => {
    const sut = makeSut();

    // Pegando um função e modificado o retorno dela
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt("any_value");

    await expect(promise).rejects.toThrow();
  });
});
