import { API, Auth, graphqlOperation } from "aws-amplify";

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();
  //get all chat room of user1
  const myChatRooms = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
  );

  const chatRooms = myChatRooms.data?.getUser?.chatrooms.items || [];

  const chatRoom = chatRooms.find((chatRoomItem) =>
    chatRoomItem.chatRoom.ChatRoomUsers.items.some(
      (userItem) => userItem.user.id === userID
    )
  );
  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      chatrooms {
        items {
          chatRoom {
            id
            ChatRoomUsers {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
