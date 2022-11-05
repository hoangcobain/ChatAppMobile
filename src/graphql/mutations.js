/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      userID
      chatroomID
      image
      audio
      status
      replyToMessageID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        items {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoomUsers {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
          startedAt
        }
        lastOnlineAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        items {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoomUsers {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
          startedAt
        }
        lastOnlineAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      newMessages
      LastMessage {
        id
        content
        userID
        chatroomID
        image
        audio
        status
        replyToMessageID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        items {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoomUsers {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Admin {
        id
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
          startedAt
        }
        lastOnlineAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      name
      imageUri
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      Messages {
        items {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      chatrooms {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      lastOnlineAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      Messages {
        items {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      chatrooms {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      lastOnlineAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      Messages {
        items {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      chatrooms {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      lastOnlineAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        LastMessage {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUsers {
          nextToken
          startedAt
        }
        Admin {
          id
          name
          imageUri
          status
          lastOnlineAt
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
          startedAt
        }
        lastOnlineAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        LastMessage {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUsers {
          nextToken
          startedAt
        }
        Admin {
          id
          name
          imageUri
          status
          lastOnlineAt
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
          startedAt
        }
        lastOnlineAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessages
        LastMessage {
          id
          content
          userID
          chatroomID
          image
          audio
          status
          replyToMessageID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUsers {
          nextToken
          startedAt
        }
        Admin {
          id
          name
          imageUri
          status
          lastOnlineAt
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        name
        imageUri
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        Messages {
          nextToken
          startedAt
        }
        chatrooms {
          nextToken
          startedAt
        }
        lastOnlineAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
