import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Message } from "../../types";
import styles from "../ChatMessageReply/style";
import { Auth, DataStore, Storage } from "aws-amplify";
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native";
import AudioPlayer from "../AudioPlayer";
import { AntDesign } from "@expo/vector-icons";
import { Message as MessageModel } from "../../src/models";

export type ChatMessageProps = {
  messages: Message;
};

const ChatMessageReply = (props: ChatMessageProps) => {
  // const { messages } = props;
  const { messages: propMessage } = props;
  const { width } = useWindowDimensions();

  const [messages, setMessage] = useState<MessageModel>(propMessage);
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean | null>(null);
  const [soundURI, setSoundURI] = useState<any>(null);

  useEffect(() => {
    DataStore.query(User, messages.userID).then(setUser);
  }, []);

  useEffect(() => {
    setMessage(propMessage);
  }, [propMessage]);

  useEffect(() => {
    if (messages.audio) {
      Storage.get(messages.audio).then(setSoundURI);
    }
  }, [messages]);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return;
      }
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMe ? "#c9e4fc" : "white",
            marginLeft: isMe ? -5 : 0,
            marginRight: isMe ? 0 : 5,
          },
          { padding: soundURI ? 0 : 10 },
        ]}
      >
        {!isMe && (
          <Text
            style={[
              styles.name,
              {
                paddingTop: soundURI ? 10 : 0,
                paddingLeft: soundURI ? 11 : 0,
              },
            ]}
            numberOfLines={1}
          >
            {user?.name}
          </Text>
        )}
        {messages.image && (
          <View style={{ marginBottom: 5 }}>
            <S3Image
              imgKey={messages.image}
              style={{ width: width * 0.65, aspectRatio: 4 / 3 }}
              resizeMode="contain"
            />
          </View>
        )}
        {soundURI && <AudioPlayer soundURI={soundURI} />}
        <Text
          style={[
            styles.message,
            { marginLeft: soundURI ? 10 : 0, marginBottom: soundURI ? 10 : 0 },
          ]}
        >
          {messages.content}
        </Text>
        {!soundURI && (
          <Text style={styles.time}>
            {moment(messages.createdAt).fromNow()}
          </Text>
        )}
      </View>
      {/* {isMe && !!messages.status && messages.status !== "SENT" && (
        <AntDesign
          name={
            messages.status === "DELIVERED" ? "checkcircleo" : "checkcircle"
          }
          size={15}
          color="gray"
          style={styles.checkIcon}
        />
      )} */}
    </View>
  );
};

export default ChatMessageReply;
