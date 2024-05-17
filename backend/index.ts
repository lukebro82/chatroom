import * as express from "express";
import { firestore, rtdb } from "./db";
import { nanoid } from "nanoid"; //version vieja de nanoid porque la nueva dio problemas
// import { v4 as uuidv4 } from "uuid"; usamos nanoid es mas rapido....
import * as cors from "cors";
import * as path from "path";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const usersCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;

  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        usersCollection.add({ email, nombre }).then((newUserRef) => {
          res.json({ id: newUserRef.id });
        });
      } else {
        res.status(400).json({ message: "user already exists" });
      }
    });
});

app.post("/auth", (req, res) => {
  const { email } = req.body;

  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        res.status(404).json({ message: "not found" });
      } else {
        res.json({ id: searchResponse.docs[0].id });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const romRef = rtdb.ref("rooms/" + nanoid());

        romRef.set({ messages: [], owner: userId }).then(() => {
          const roomLongId = romRef.key;
          const roomId = 1000 + Math.floor(Math.random() * 999);
          roomsCollection
            .doc(roomId.toString())
            .set({ rtdbRoomId: roomLongId })
            .then(() => {
              res.json({ id: roomId.toString() });
            });
        });
      } else {
        res.status(401).json({ message: "no existis" });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({ message: "no existis" });
      }
    });
});

app.get("/mensajes/:rtdbRoomId", function (req, res) {
  const { rtdbRoomId } = req.params;
  const chatRoomsRef = rtdb.ref("/rooms/" + rtdbRoomId + "/data");

  chatRoomsRef.get().then((snapshot) => {
    const usersData = [];

    snapshot.forEach((doc) => {
      usersData.push(doc);
    });

    res.json(usersData);
  });
});

app.post("/mensajes/:rtdbRoomId", function (req, res) {
  const { rtdbRoomId } = req.params;

  const chatRoomsRef = rtdb.ref("/rooms/" + rtdbRoomId + "/data/");
  chatRoomsRef.push(req.body, function () {
    res.json("todo OK");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
