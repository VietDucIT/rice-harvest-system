import { Typography, Colors, Spacings } from "react-native-ui-lib";

const StyleInit = () => {
  Colors.loadColors({
    green: "#5CB157",
    red: "#F00",
  });

  Typography.loadTypographies({
    h1: { fontSize: 58, fontWeight: "300", lineHeight: 80 },
    h2: { fontSize: 46, fontWeight: "300", lineHeight: 64 },
  });
};

export { StyleInit };
