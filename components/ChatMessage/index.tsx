import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Message } from "../../types";
import styles from "../ChatMessage/style";
import { Auth, DataStore, Storage } from "aws-amplify";
import { User } from "../../src/models";
import { S3Image } from "aws-amplify-react-native";
import AudioPlayer from "../AudioPlayer";
import { AntDesign } from "@expo/vector-icons";
import { Message as MessageModel } from "../../src/models";
import ChatMessageReply from "../ChatMessageReply";
import { useActionSheet } from "@expo/react-native-action-sheet";

export type ChatMessageProps = {
  messages: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
  // const { messages } = props;
  const { setAsMessageReply, messages: propMessage } = props;
  const { width } = useWindowDimensions();

  const [repliedTo, setRepliedTo] = useState<MessageModel | undefined>(
    undefined
  );
  const [messages, setMessage] = useState<MessageModel>(propMessage);
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean | null>(null);
  const [soundURI, setSoundURI] = useState<any>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    DataStore.query(User, messages.userID).then(setUser);
  }, []);

  useEffect(() => {
    setMessage(propMessage);
  }, [propMessage]);

  useEffect(() => {
    if (messages?.replyToMessageID) {
      DataStore.query(MessageModel, messages.replyToMessageID).then(
        setRepliedTo
      );
    }
  }, [messages]);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel, messages.id).subscribe(
      (data) => {
        // console.log(data.model, data.opType, data.element);
        if (data.model === MessageModel) {
          if (data.opType === "UPDATE") {
            setMessage((message) => ({ ...message, ...data.element }));
          } else if (data.opType === "DELETE") {
            setIsDeleted(true);
          }
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setAsRead();
  }, [isMe, messages]);

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

  const setAsRead = async () => {
    if (isMe === false && messages.status !== "READ") {
      await DataStore.save(
        MessageModel.copyOf(messages, (updated) => {
          updated.status = "READ";
        })
      );
    }
  };

  const deleteMessage = async () => {
    await DataStore.delete(messages);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete the message?",
      [
        {
          text: "Delete",
          onPress: deleteMessage,
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const onActionPress = (index) => {
    if (index === 0) {
      setAsMessageReply();
    } else if (index === 1) {
      confirmDelete();
    }
  };

  const openActionMenu = () => {
    const options = ["Reply"];
    if (isMe) {
      options.push("Delete");
    }
    options.push("Cancel");
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      onActionPress
    );
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={openActionMenu}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMe ? "#c9e4fc" : "white",
            marginLeft: isMe ? 50 : 0,
            marginRight: isMe ? 0 : 50,
          },
        ]}
      >
        {repliedTo && <ChatMessageReply messages={repliedTo} />}
        {!isMe && (
          <Text
            style={[
              styles.name,
              {
                paddingTop: soundURI ? 10 : 0,
                paddingLeft: soundURI ? 11 : 0,
              },
            ]}
          >
            {user?.name}
          </Text>
        )}
        {messages.image && (
          <View style={{ marginBottom: 5 }}>
            <S3Image
              imgKey={messages.image}
              style={{ width: width * 0.7, aspectRatio: 4 / 3 }}
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
          {isDeleted ? "Message deleted" : messages.content}
        </Text>
        {
          <Text
            style={[
              styles.time,
              {
                paddingBottom: soundURI ? 10 : 0,
                paddingRight: soundURI ? 10 : 0,
              },
            ]}
          >
            {moment(messages.createdAt).fromNow()}
          </Text>
        }
      </View>
      {isMe && !!messages.status && messages.status !== "SENT" && (
        <AntDesign
          name={
            messages.status === "DELIVERED" ? "checkcircleo" : "checkcircle"
          }
          size={15}
          color="gray"
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );
};

export default ChatMessage;
