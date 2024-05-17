import { rtdb } from "./rtdb";
import { API_BASE_URL } from ".";
import map from "lodash/map";

type Message = { mensaje: string; nombre: string };

const state = {
  data: {
    myName: "",
    userId: "",
    myEmail: "",
    roommId: "",
    roomRtdbId: "",
    messages: [] as Message[],
  },
  listeners: [],
  getState() {
    return this.data;
  },

  async auth(mail) {
    return fetch(API_BASE_URL + "/auth", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: mail,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async signUp(email, name) {
    return fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nombre: name,
        email: email,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async init(rtdbID) {
    this.data.roomRtdbId = rtdbID;
    fetch(API_BASE_URL + "/mensajes/" + rtdbID, {
      method: "get",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        state.setmessages(data);
      });

    const chatRoomsRef = rtdb.ref("/rooms/" + rtdbID + "/data");
    chatRoomsRef.on("value", (snapshot) => {
      const messagesNew = snapshot.val();
      this.setmessages(messagesNew);
      for (const cb of this.listeners) {
        cb();
      }
    });
  },
  setName(name: string) {
    const currentState = this.getState();
    currentState.myName = name;
    this.setState(currentState);
  },

  setEmail(email) {
    const currentState = this.getState();
    currentState.myEmail = email;
    this.setState(currentState);
  },
  setRoomId(roomid) {
    const currentState = this.getState();
    currentState.roommId = roomid;
    this.setState(currentState);
  },

  setUserId(id) {
    const currentState = this.getState();
    currentState.userId = id;
    this.setState(currentState);
  },

  async createRoom(userId) {
    return fetch(API_BASE_URL + "/rooms", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  async joinRoom(roomId, userId) {
    return fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
      method: "get",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  },

  setmessages(messages) {
    const currentState = this.getState();
    let newMessages = map(messages);
    currentState.messages = newMessages;
    this.setState(currentState);
  },

  sendMessage(message: String) {
    const rtdbid = state.data.roomRtdbId;

    fetch(API_BASE_URL + "/mensajes/" + rtdbid, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nombre: state.data.myName,
        mensaje: message,
      }),
    });
  },
  setState(state) {
    this.data = state;
    for (const cb of this.listeners) {
      cb();
    }
  },
  subscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },
};

export { state };
