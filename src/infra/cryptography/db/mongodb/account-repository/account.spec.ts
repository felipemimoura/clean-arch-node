import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account-repository";

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect()
  });

  beforeEach(async() => {
    const accountCollection = MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  }
  test("Should return an account on Success", async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: "any_name",
      email: "any_mail@mail.com",
      password: "any_password",
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_mail@mail.com");
    expect(account.password).toBe("any_password");
  });
});
