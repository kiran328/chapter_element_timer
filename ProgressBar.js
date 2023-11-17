import { View, StyleSheet } from "react-native";

const ProgressBar = ({ total, remaining }) => {
  const progress = ((total - remaining) / total) * 100;

  return <View style={{ ...styles.container, width: progress + "%" }}></View>;
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#023047",
    borderRadius: 4
  },
});

export default ProgressBar;
