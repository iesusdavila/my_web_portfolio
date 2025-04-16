export default {
  server: {
    cors: {
      origin: "*", 
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    },
    fs: {
      strict: false,
      allow: ["."]
    },
    host: "0.0.0.0",
    port: 5000,
    hmr: {
      clientPort: 443
    },
    // Allow all hosts to access the dev server
    origin: "http://localhost:5000",
    allowedHosts: [
      "localhost", 
      ".replit.dev", 
      ".replit.app", 
      ".repl.co", 
      "93a3c83d-c61f-4837-b888-c4c54eef5c2f-00-2e93q4n9oobd9.kirk.replit.dev",
      "*"
    ]
  }
}