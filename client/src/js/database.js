// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () =>
// We are creating a new database named 'cards' which will be using version 1 of the database.
  openDB('cards', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('cards')) {
        console.log('cards database already exists');
        return;
      }

      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
      console.log('cards database created');
    },
  });


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('Post to the database', name, home, cell, email);

    // Create a connection to the database database and version we want to use.
    const cardsDb = await openDB('cards', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = cardsDb.transaction('cards', 'readwrite');

    // Open up the desired object store.
     const store = tx.objectStore('cards');

    // Use the .add() method on the store and pass in the content.
    const request = store.add({ card: name, home, cell, email });

    // Get confirmation of the request.
    const result = await request;
    console.log('Data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET all from the database');

    // Create a connection to the database database and version we want to use.
    const cardsDb = await openDB('cards', 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = cardsDb.transaction('cards', 'readonly');

    // Open up the desired object store.
    const store = tx.objectStore('cards');

    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();

   // Get confirmation of the request.
    const result = await request;
     console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    // Open a connection to the 'cards' database
    const cardsDb = await openDB('cards', 1);

    // Start a readwrite transaction on the 'cards' object store
    const tx = cardsDb.transaction(objectStoreName, 'readwrite');

    // Get the object store
    const store = tx.objectStore(objectStoreName);

    // Delete the data with the specified ID from the object store
    await store.delete(id);

    // Complete the transaction
    await tx.complete;

    console.log(`Data with ID ${id} deleted from the database.`);
};

initdb();
