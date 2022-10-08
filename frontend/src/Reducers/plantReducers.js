export const plantListReducer = (state = { plants: [] }, action) => {
  switch (action.type) {
    case "PLANT_LIST":
      return { plants: action.payload };

    default:
      return state;
  }
};

export const plantDetailsReducer = (state = { plant: {} }, action) => {
  switch (action.type) {
    case "PLANT_DETAILS":
      return { plant: action.payload };

    default:
      return state;
  }
};

export const plantDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLANT_DELETE":
      return { success: true };

    default:
      return state;
  }
};

export const plantCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLANT_CREATE":
      return { success: true, plant: action.payload };

    case "PLANT_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

export const plantEditReducer = (state = { plant: {} }, action) => {
  switch (action.type) {
    case "PLANT_EDIT":
      return { success: true, plant: action.payload };

    case "PLANT_EDIT_RESET":
      return { plant: {} };

    default:
      return state;
  }
};
