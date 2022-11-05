/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
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
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
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
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
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
