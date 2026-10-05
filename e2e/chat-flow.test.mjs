import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { after, before, test } from "node:test";
import { initializeApp, deleteApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  addDoc,
  where,
  getFirestore,
} from "firebase/firestore";

const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST ?? "127.0.0.1:8080";
const [host, port] = emulatorHost.split(":");
const emulatorAvailable = await fetch(`http://${emulatorHost}`).then(() => true).catch(() => false);
const app = initializeApp({ projectId: `shakee-e2e-${randomUUID()}` });
const db = getFirestore(app);
const writes = [];

before(() => {
  if (emulatorAvailable) connectFirestoreEmulator(db, host, Number(port));
});
after(async () => {
  await Promise.all(writes.map((reference) => deleteDoc(reference).catch(() => undefined)));
  await deleteApp(app);
});

test("participants open the same room and exchange real-time messages", { skip: !emulatorAvailable && "Start the Firestore emulator on the configured host to run this E2E flow" }, async () => {
  const userId = `user-${randomUUID()}`;
  const partnerId = `partner-${randomUUID()}`;
  const roomId = [userId, partnerId].sort().map(encodeURIComponent).join("__");
  const roomRef = doc(db, "rooms", roomId);
  writes.push(roomRef);

  // Opening from either side converges on the same room document.
  await setDoc(roomRef, { roomId, userId, partnerId, createdAt: serverTimestamp() }, { merge: true });
  await setDoc(roomRef, { roomId, userId, partnerId, createdAt: serverTimestamp() }, { merge: true });
  const room = await getDoc(roomRef);
  assert.equal(room.exists(), true);
  assert.equal(room.data().roomId, roomId);

  const received = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Partner did not receive the message")), 5000);
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), where("roomId", "==", roomId)),
      (snapshot) => {
        const message = snapshot.docs.find((item) => item.data().content === "Hello from the other side");
        if (!message) return;
        clearTimeout(timeout);
        unsubscribe();
        resolve(message.data());
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      },
    );
  });

  const sentMessage = await addDoc(collection(db, "messages"), {
    roomId,
    userId,
    content: "Hello from the other side",
    hasRead: false,
    createdAt: serverTimestamp(),
  });
  writes.push(sentMessage);
  const message = await received;
  assert.equal(message.userId, userId);
  assert.equal(message.hasRead, false);

  const inbox = await getDocs(query(collection(db, "messages"), where("roomId", "==", roomId)));
  assert.equal(inbox.size, 1);
  assert.equal(inbox.docs[0].data().content, "Hello from the other side");
});
