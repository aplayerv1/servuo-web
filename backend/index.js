const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { xml2js, js2xml } = require("xml-js");
const net = require("net"); // Add this line

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve status.txt with simple Online status
app.get('/status.txt', (req, res) => {
  res.type('text/plain');
  res.send('Online');
});


app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const xmlPath = "./backend/accounts.xml";

  const xml = fs.readFileSync(xmlPath, "utf-8");
  const json = xml2js(xml, { compact: true });
  const now = new Date().toISOString();

  const users = json.accounts.account || [];
  const existing = Array.isArray(users)
    ? users.find((u) => u.username._text === username)
    : users.username._text === username;

  if (existing) {
    return res.json({ message: "Username already exists" });
  }

  const newAccount = {
    username: { _text: username },
    newCryptPassword: { _text: password },
    accessLevel: { _text: "Player" },
    created: { _text: now },
    lastLogin: { _text: now },
    totalGameTime: { _text: "PT0S" },
    chars: {},
    totalCurrency: { _text: "0" },
    sovereigns: { _text: "0" }
  };

  if (!Array.isArray(json.accounts.account)) {
    json.accounts.account = [json.accounts.account];
  }

  json.accounts.account.push(newAccount);
  json.accounts._attributes.count = json.accounts.account.length.toString();

  const newXml = js2xml(json, { compact: true, spaces: 2 });
  fs.writeFileSync(xmlPath, newXml);

  res.json({ message: "Account created successfully" });
});
app.get('/api/server-status', (req, res) => {
  const serverIP = process.env.GAME_SERVER_IP || '10.10.1.230';
  const serverPort = process.env.GAME_SERVER_PORT || 2593; // Default UO port
  
  checkServerConnection(serverIP, serverPort)
    .then(isOnline => {
      res.json({
        status: isOnline ? 'Online' : 'Offline',
        timestamp: new Date().toISOString()
      });
    })
    .catch(error => {
      console.error('Error checking server status:', error);
      res.json({
        status: 'Offline',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    });
});

// Function to check if a server is reachable
function checkServerConnection(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    
    // Set a timeout (3 seconds)
    socket.setTimeout(3000);
    
    // Attempt to connect
    socket.connect(port, host, () => {
      socket.end();
      resolve(true); // Connection successful
    });
    
    // Handle connection timeout
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false); // Connection timed out
    });
    
    // Handle connection errors
    socket.on('error', () => {
      resolve(false); // Connection failed
    });
  });
}

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
