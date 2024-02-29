const { exec } = require("child_process");

// Exécute le script Python
const pythonProcess = exec("npm run start:app");

// Lorsque le script Python est terminé, démarre l'application Angular
pythonProcess.on("close", () => {
  exec("npm run start:angular");
});
