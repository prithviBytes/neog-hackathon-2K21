import fb, { db } from "../../../firebase";

export default function ChatParticipants({ members, chatroomId }) {
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

  console.log({ members });

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
          <button onClick={() => convertToParticipant(member.uid)}>
            Accept Request
          </button>
        ) : null;
      return (
        <div className="member-item" key={member.uid}>
          <span>{member.name}</span>
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
          <button onClick={() => convertToParticipant(member.uid)}>
            Add Participant
          </button>
        ) : null;
      return (
        <div className="member-item" key={member.uid}>
          <span>{member.name}</span>
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
        <button onClick={() => moveToLobby(user.uid)}>Return to Lobby</button>
      );
    } else if (currentUserRole === "AUDIANCE" && user.hasActiveRequest) {
      actionBtn = (
        <button onClick={withdrawRequestForUser}>Withdraw Request</button>
      );
    } else if (currentUserRole === "AUDIANCE" && !user.hasActiveRequest) {
      actionBtn = (
        <button onClick={requestAccessForUser}>Request Access</button>
      );
    }
    return (
      <div className="member-item" key={user.uid}>
        <span>{user.name}</span>({user.role}){actionBtn}
      </div>
    );
  };

  const userComponent = getUserComponent(user);

  function getParticipant(member) {
    const currentUserRole = user.role;
    const actionBtn =
      currentUserRole === "OWNER" ? (
        <button onClick={() => moveToLobby(member.uid)}>Move To Lobby</button>
      ) : null;
    return (
      <div className="member-item" key={member.uid}>
        <span>{member.name}</span>
        {actionBtn}
      </div>
    );
  }

  function addUserToChatroom(userId) {
    db.collection("users")
      .doc(userId)
      .get()
      .then(doc => {
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
      })
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
    <div className="chat-participants">
      <h3>Chat Participants</h3>
      <div>
        <div className="member-item" key={owner.uid}>
          <span>{owner.name}</span> (Organizer)
        </div>

        <h2>User</h2>
        {userComponent}

        {participants && (
          <>
            <h2>Participants</h2> {participants}
          </>
        )}

        <hr />
        <h2>Audiance</h2>
        {requestAudianceList}
        {nonRequestAudianceList}
      </div>
    </div>
  );
}
