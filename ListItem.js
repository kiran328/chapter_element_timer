import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";

const ListItem = ({ title, index, visibleItems, timer }) => {
  const [remainingTime, setRemainingTime] = React.useState(timer);
  const [itemBackground, setItemBackground] = React.useState("#fff");

  useEffect(() => {
    var countDownTimer;
    if (visibleItems.length === 0) return;
    if (visibleItems.indexOf(index) > -1) {
      setItemBackground("#8ecae6");
      countDownTimer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime == 0) return 0;
          return prevTime - 1000;
        });
      }, 1000);
    } else {
      setItemBackground("#fff");
      if (countDownTimer) clearInterval(countDownTimer);
    }
    return () => {
      clearInterval(countDownTimer);
    };
  }, [visibleItems.length]);

  return (
    <View style={{ ...styles.item, backgroundColor: itemBackground }}>
      <ProgressBar total={timer} remaining={remainingTime} />
      <Text style={styles.title}>
        {index} - {title}
      </Text>
      <Text style={styles.timerText}>
        {remainingTime / 1000}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#219ebc",
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
  },
  timerText: {
    fontSize: 17,
    padding: 10,
    color: 'gray'
  }
});

export default ListItem;
