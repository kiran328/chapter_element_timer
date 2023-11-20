import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

let timer = null;

let startTime = 0;
let endTime = 0;

const Youtube = ({ id, play }) => {
  const [watchedTime, setWatchedTime] = useState(2);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isVideoWatched, setIsVideoWatched] = useState(false);
  const playerRef = useRef();

  useEffect(() => {
    if(play && watchedTime) {
      playerRef.current.seekTo(watchedTime)
    }
    
  }, [play]);

  useEffect(() => {
    if (startTime && playbackTime && watchedTime && playbackTime - 5 <= watchedTime) {
      clearInterval(timer);
      setIsVideoWatched(true);
      console.log("USER has watched full video...", playbackTime, watchedTime);
    }
  }, [startTime, playbackTime, watchedTime]);

  const onReady = async () => {
    if (startTime && endTime) {
      setPlaybackTime(endTime - startTime);
      return;
    }
    const durationInSeconds = await playerRef.current.getDuration();
    setPlaybackTime(durationInSeconds);
  };

  const onStateChange = (state) => {
    switch (state) {
      case "ended":
        handleVideoEnded();
        break;
      case "playing":
        handleVideoPlaying();
        break;
      case "paused":
        handleVideoPaused();
      default:
        break;
    }
  };

  const handleVideoEnded = () => {
    clearInterval(timer);
    if (playbackTime - 5 <= watchedTime) {
      setIsVideoWatched(true);
      console.log("USER has watched full video...");
    }
  };

  const handleVideoPlaying = () => {
    timer = setInterval(() => {
      setWatchedTime((prevTime) =>  prevTime + 1);
    }, 1000);
  };

  const handleVideoPaused = () => {
    setWatchedTime((prevTime) => prevTime + 1);
    clearInterval(timer);
  };

  let styles = {};
  if(isVideoWatched) {
    styles = { borderWidth: 10, borderColor: 'green' };
  }

  return (
    <View style={styles}>
      <YoutubePlayer
        ref={playerRef}
        height={220}
        videoId={id}
        play={play}
        onReady={onReady}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default Youtube;
