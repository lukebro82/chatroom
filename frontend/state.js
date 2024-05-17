"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const rtdb_1 = require("./rtdb");
const _1 = require(".");
const map_1 = require("lodash/map");
const state = {
    data: {
        myName: "",
        userId: "",
        myEmail: "",
        roommId: "",
        roomRtdbId: "",
        messages: [],
    },
    listeners: [],
    getState() {
        return this.data;
    },
    async auth(mail) {
        return fetch(_1.API_BASE_URL + "/auth", {
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
        return fetch(_1.API_BASE_URL + "/signup", {
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
        fetch(_1.API_BASE_URL + "/mensajes/" + rtdbID, {
            method: "get",
        })
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            state.setmessages(data);
        });
        const chatRoomsRef = rtdb_1.rtdb.ref("/rooms/" + rtdbID + "/data");
        chatRoomsRef.on("value", (snapshot) => {
            const messagesNew = snapshot.val();
            this.setmessages(messagesNew);
            for (const cb of this.listeners) {
                cb();
            }
        });
    },
    setName(name) {
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
        return fetch(_1.API_BASE_URL + "/rooms", {
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
        return fetch(_1.API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
            method: "get",
            headers: { "content-type": "application/json" },
        }).then((res) => {
            return res.json();
        });
    },
    setmessages(messages) {
        const currentState = this.getState();
        let newMessages = (0, map_1.default)(messages);
        currentState.messages = newMessages;
        this.setState(currentState);
    },
    sendMessage(message) {
        const rtdbid = state.data.roomRtdbId;
        fetch(_1.API_BASE_URL + "/mensajes/" + rtdbid, {
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
    subscribe(cb) {
        this.listeners.push(cb);
    },
};
exports.state = state;
