import { fetchNoToken, fetchToken } from "../../helpers/fetch";

describe("Tests in the helper Fetch", () => {
  let token = "";
  test("fetchNoToken should work", async () => {
    const resp = await fetchNoToken(
      "auth",
      { email: "isaac@gmail.com", password: "123456" },
      "POST"
    );
    const body = await resp.json();
    token = body.token;
    expect(resp instanceof Response).toBe(true);
    expect(resp.ok).toBe(true);
  });

  test("fetchToken should work", async () => {
    localStorage.setItem("token", token);
    const resp = await fetchToken(
      "events/5ee25d21c25cce32af01a3f3",
      {},
      "DELETE"
    );
    const body = await resp.json();
    expect(body.msg).toBe("There is no event for this id");
  });
});
