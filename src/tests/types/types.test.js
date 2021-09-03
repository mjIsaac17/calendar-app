import { types } from "../../types/types";

describe("Tests in types", () => {
  test("types should be the same", () => {
    const expectedTypes = {
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",

      eventSetActive: "[event] Set active",
      eventLogout: "[event] Logout",
      eventStartAddNew: "[event] Start add new",
      eventAddNew: "[event] Add new",
      eventClearActive: "[event] Clear active",
      eventUpdate: "[event] Event update",
      eventDelete: "[event] Event delete",
      eventLoaded: "[event] Events loaded",

      authCheckingFinish: "[auth] Finish checking login state",
      authStartLogin: "[auth] Start login",
      authLogin: "[auth] Login",
      authStartRegister: "[auth] Start register",
      authStartTokenRenew: "[auth] Start token renew",
      authLogout: "[auth] Logout",
    };

    expect(types).toEqual(expectedTypes);
  });
});
