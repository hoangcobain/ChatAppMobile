import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AVPlaybackStatus, Audio } from "expo-av";
import styles from "../AudioPlayer/style";

function AudioPlayer({ soundURI }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    loadSound();
    () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [soundURI]);

  const loadSound = async () => {
    if (!soundURI) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri: soundURI },
      {},
      onPlayBackStatusUpdate
    );
    setSound(sound);
  };

  const onPlayBackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }
    setAudioProgress(status.positionMillis / (status.durationMillis || 1));
    setPaused(!status.isPlaying);
    setAudioDuration(status.durationMillis || 0);
  };

  const getDuration = () => {
    const minutes = Math.floor(audioDuration / (60 * 1000));
    const seconds = Math.floor((audioDuration % (60 * 1000)) / 1000);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playPauseSound = async () => {
    if (!sound) {
      return;
    }
    if (paused) {
      await sound.playFromPositionAsync(0);
    } else {
      await sound.pauseAsync();
    }
  };
  return (
    <View style={styles.audioContainer}>
      <Pressable onPress={playPauseSound}>
        <Feather name={paused ? "play" : "pause"} size={24} color="gray" />
      </Pressable>
      <View style={styles.audioProgressBG}>
        <View
          style={[styles.audioProgressFG, { left: `${audioProgress * 100}%` }]}
        ></View>
      </View>
      <Text>{getDuration()}</Text>
    </View>
  );
}

export default AudioPlayer;
