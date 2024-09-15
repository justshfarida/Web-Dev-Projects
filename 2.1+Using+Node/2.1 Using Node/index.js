const fs = require("fs");

fs.readFile("./meesage.txt", (err, data) => {
    if (err) throw err;
    console.log(data.toString()); // Convert buffer to string
});
