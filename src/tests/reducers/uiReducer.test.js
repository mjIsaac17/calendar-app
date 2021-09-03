import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
  modalOpen: false,
};

describe("Tests in uiReducer", () => {
  test("should return the state by defect", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should open and close the modal", () => {
    const modalOpen = uiOpenModal();
    let state = uiReducer(initialState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();
    state = uiReducer(initialState, modalClose);
    expect(state).toEqual({ modalOpen: false });
  });
});
