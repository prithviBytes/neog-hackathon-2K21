import fb, { db } from "../../../firebase";
import "./chatparticipants.css";
import Avatar from "../../Avatar/Avatar";
import { userColors } from "../../../constants";
import { IoHandRightSharp, IoExit } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FaHandRock } from "react-icons/fa";
export default function ChatParticipants({
  members,
  chatroomId,
  chatRoomData,
  showChatParticipantsPanel,
}) {
  if (
    !fb.auth().currentUser ||
    (Object.keys(members).length === 0 && members.constructor === Object)
  ) {
    return <h2>No User</h2>;
  }
  if (!members[fb.auth().currentUser.uid]) {
    addUserToChatroom(fb.auth().currentUser.uid);
    return <h2>No User</h2>;
  }

  let user = fb.auth().currentUser && members[fb.auth().currentUser.uid];
  let { owner, participants, audiance } = Object.values(members).reduce(
    (acc, member) => {
      if (member.isActive && member.uid === user.uid) {
        if (member.role === "OWNER") {
          return { ...acc, owner: member };
        }
        return { ...acc };
      }
      if (member.isActive && member.role === "OWNER") {
        return {
          ...acc,
          owner: member,
        };
      }
      if (member.isActive && member.role === "PARTICIPANT") {
        const participant = getParticipant(member);
        return {
          ...acc,
          participants: [...acc.participants, participant],
        };
      }
      if (member.isActive && member.role === "AUDIANCE") {
        return {
          ...acc,
          audiance: [...acc.audiance, member],
        };
      }
    },
    {
      owner: {},
      participants: [],
      audiance: [],
    }
  );

  const { requestAudiance, nonRequestAudiance } = audiance.reduce(
    (acc, member) => {
      if (member.hasActiveRequest) {
        return {
          ...acc,
          requestAudiance: [...(acc.requestAudiance || []), member],
        };
      } else {
        return {
          ...acc,
          nonRequestAudiance: [...(acc.nonRequestAudiance || []), member],
        };
      }
    },
    { requestAudiance: [], nonRequestAudiance: [] }
  );

  const requestAudianceSortedByTimestamp =
    requestAudiance &&
    requestAudiance.sort((a, b) => {
      return a.requestTimestamp < b.requestTimestamp;
    });

  const requestAudianceList =
    requestAudianceSortedByTimestamp &&
    requestAudianceSortedByTimestamp.map((member) => {
      const currentUserRole = user.role;
      const actionBtn =
        currentUserRole === "OWNER" ? (
          <IoHandRightSharp
            title="Add to participants"
            className="member-list-icons hand-icon"
            onClick={() => convertToParticipant(member.uid)}
          />
        ) : null;
      return (
        <div className="member-item" key={member.uid}>
          <Avatar
            username={member.name}
            imageURL={member.imageURL}
            avatarColor={member.avatarColor}
          />
          <p style={{ color: userColors.others }}>{member.name}</p>
          {actionBtn}
        </div>
      );
    });

  const nonRequestAudianceList =
    nonRequestAudiance &&
    nonRequestAudiance.map((member) => {
      const currentUserRole = user.role;
      const actionBtn =
        currentUserRole === "OWNER" ? (
          <AiOutlinePlusCircle
            title="Add to Participants"
            className="member-list-icons add-icon"
            onClick={() => convertToParticipant(member.uid)}
          />
        ) : null;
      return (
        <div className="member-item" key={member.uid}>
          <Avatar
            username={member.name}
            imageURL={member.imageURL}
            avatarColor={member.avatarColor}
          />
          <p style={{ color: userColors.others }}>{member.name}</p>
          {actionBtn}
        </div>
      );
    });

  const getUserComponent = (user) => {
    const currentUserRole = user.role;
    let actionBtn = null;
    if (currentUserRole === "OWNER") {
      return;
    }
    if (currentUserRole === "PARTICIPANT") {
      actionBtn = (
        <IoExit
          className="member-list-icons exit-icon"
          onClick={() => moveToLobby(user.uid)}
          title="Return to Lobby"
        ></IoExit>
      );
    } else if (currentUserRole === "AUDIANCE" && user.hasActiveRequest) {
      actionBtn = (
        <FaHandRock
          title="Withdraw request"
          className="member-list-icons hand-icon"
          onClick={withdrawRequestForUser}
        />
      );
    } else if (currentUserRole === "AUDIANCE" && !user.hasActiveRequest) {
      actionBtn = (
        <IoHandRightSharp
          title="Request Access"
          onClick={requestAccessForUser}
          className="member-list-icons hand-icon"
        />
      );
    }
    return (
      <>
        <h5 className="chat-participants-header">Your Role: {user.role}</h5>
        <div className="member-item" key={user.uid}>
          <Avatar
            username={user.name}
            avatarColor={user.avatarColor}
            imageURL={user.imageURL}
          />
          <p style={{ color: "#FFD700" }}>{user.name}</p>
          {actionBtn}
        </div>
      </>
    );
  };

  const userComponent = getUserComponent(user);

  function getParticipant(member) {
    const currentUserRole = user.role;
    const actionBtn =
      currentUserRole === "OWNER" ? (
        <AiOutlineMinusCircle
          title="Remove from Participants"
          className="member-list-icons minus-icon"
          onClick={() => moveToLobby(member.uid)}
        />
      ) : null;
    return (
      <div className="member-item" key={member.uid}>
        <Avatar
          username={member.name}
          imageURL={member.imageURL}
          avatarColor={member.avatarColor}
        />
        <p style={{ color: userColors.participants }}>{member.name}</p>
        {actionBtn}
      </div>
    );
  }

  function addUserToChatroom(userId) {
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        const user = doc.data();
        db.collection("chatrooms")
          .doc(chatroomId)
          .collection("members")
          .doc(userId)
          .set({
            uid: userId,
            avatarColor: user.avatarColor,
            imageURL: user.imageURL,
            name: user.name,
            role: "AUDIANCE",
            isActive: true,
          });
      });
  }

  function requestAccessForUser() {
    db.collection("chatrooms")
      .doc(chatroomId)
      .collection("members")
      .doc(user.uid)
      .set({
        ...user,
        hasActiveRequest: true,
        requestTimestamp: new Date().valueOf(),
      });
  }

  function withdrawRequestForUser() {
    db.collection("chatrooms")
      .doc(chatroomId)
      .collection("members")
      .doc(user.uid)
      .set({
        ...user,
        hasActiveRequest: false,
      });
  }

  function convertToParticipant(memberId) {
    db.collection("chatrooms")
      .doc(chatroomId)
      .collection("members")
      .doc(memberId)
      .set({
        ...members[memberId],
        role: "PARTICIPANT",
        hasActiveRequest: false,
      });
  }

  function moveToLobby(memberId) {
    db.collection("chatrooms")
      .doc(chatroomId)
      .collection("members")
      .doc(memberId)
      .set({
        ...members[memberId],
        role: "AUDIANCE",
      });
  }
  return (
    <div
      className="chat-participants"
      style={{ display: showChatParticipantsPanel ? "block" : "none" }}
    >
      <h5 className="chat-participants-header">Description</h5>
      <p className="chat-description">{chatRoomData.description}</p>
      <h5 className="chat-participants-header">
        Members-{Object.keys(members).length}
      </h5>
      <div>
        <div className="member-item" key={owner.uid}>
          <Avatar
            imageURL={owner.imageURL}
            username={owner.name}
            avatarColor={owner.avatarColor}
          />
          <p style={{ color: userColors.owner }}>{owner.name}</p>
        </div>

        {user.role !== "OWNER" && userComponent}

        {participants && (
          <>
            <h5 className="chat-participants-header">
              Participants {participants.length > 0 ? participants.length : ""}
            </h5>{" "}
            {participants}
          </>
        )}
        <h5 className="chat-participants-header">
          Audiance Participants{" "}
          {requestAudianceList.length + nonRequestAudianceList.length > 0
            ? " - " + requestAudianceList.length + nonRequestAudianceList.length
            : ""}
        </h5>
        {requestAudianceList}
        {nonRequestAudianceList}
      </div>
    </div>
  );
}
