import * as SecureStore from "expo-secure-store";

const getUserIdStored = () => {
  return SecureStore.getItemAsync("USER_ID");
};

export default getUserIdStored;
