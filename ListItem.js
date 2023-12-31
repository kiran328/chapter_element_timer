import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";

import ProgressBar from "./ProgressBar";
import Youtube from "./Youtube";

const ListItem = ({
  title,
  index,
  visibleItems,
  timer,
  type = "text",
  youtubeId,
  onNavigate,
}) => {
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

  let content = (
    <>
      <Text style={styles.title}>
        {index} - {title}
      </Text>
      <Text style={styles.timerText}>{remainingTime / 1000}</Text>
    </>
  );

  if (type === "Youtube") {
    content = <Youtube id={youtubeId} play={itemBackground == "#8ecae6"} />;
  }

  return (
    <ScrollView>
      <View style={{ ...styles.item, backgroundColor: itemBackground }}>
        <ProgressBar total={timer} remaining={remainingTime} />
        {content}
        <Button onPress={onNavigate} title="Navigate" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    // marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#219ebc",
    minHeight: Dimensions.get("screen").height,
    width: Dimensions.get("window").width,
    overflow: "scroll",
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
  },
  timerText: {
    fontSize: 17,
    padding: 10,
    color: "gray",
  },
});

export default ListItem;
