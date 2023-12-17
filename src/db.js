import mysql from 'mysql2/promise';

//Modify the connection details to match the details specified while
//deploying the SingleStore workspace:
const HOST = 'svc-fcbb35de-a323-409a-b54d-7731d4b0f75c-dml.aws-london-1.svc.singlestore.com';
const USER = 'admin';
const PASSWORD = '1ZmDYjcWP28Kpw7AtpTV4GTMzYy3BQvT';
const DATABASE = 'singlestoreGPT';

// main is run at the end
async function main() {
  let singleStoreConnection;
  
  try {
    singleStoreConnection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE
    });

    console.log("You have successfully connected to SingleStore.");
  } catch (err) { 
    console.error('ERROR', err);
    process.exit(1);
  } finally {
    if (singleStoreConnection) {
      await singleStoreConnection.end();
    }
  }
}

main();