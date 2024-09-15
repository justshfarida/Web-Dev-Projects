import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter your URL:'
    }//this is javascript object we need curly braces around it
  ])
  .then((answers) => {//answers={url: "https://example.com"}
  
    // This function executes when the user provides input successfully
    const url = answers.url;
    console.log('Your URL is:', url);

    // Generate QR code
    const qr_svg = qr.image(url, { type: 'svg' });//creates svg image as a stream
    qr_svg.pipe(fs.createWriteStream('i_love_qr.svg'));//writes that image to the file
    //fs.createWriteStream('i_love_qr.svg'): This creates a write stream, a mechanism for writing data to a file, in this case, i_love_qr.svg.
    //qr_svg.pipe(...): The .pipe() method connects the two streams. It takes the data from the qr_svg stream and pipes it to the fs.createWriteStream() to write it to the file.
    // Save URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) {
        console.error('An error occurred while saving the URL to a file:', err);
      } else {
        console.log('URL has been saved to URL.txt');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error('An error occurred:', error);
    }
  });
