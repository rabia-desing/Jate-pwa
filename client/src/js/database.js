import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1); // version 1 of db
  const privilegesTransaction = jateDB.transaction("jate", "readwrite"); // setting privileges
  const storeObj = privilegesTransaction.objectStore("jate");
  const request = storeObj.put({ id: 1, value: content });
  const result = await request;
  console.log(" Successfully saved data into database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1); // version 1 of db
  const privilegesTransaction = jateDB.transaction("jate", "readonly"); // setting privileges
  const store = privilegesTransaction.objectStore("jate");
  const request = store.getAll();
  const res = await request;
  console.log("result:", res);
  return res.value;
};

initdb();
