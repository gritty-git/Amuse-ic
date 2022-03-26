import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';

function songsList(){
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const TOKEN_PATH = 'token.json';

    var song_detail;

    var client_secret = "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"
    var client_id = "740188621194-8slbl3499mr2lmk8nlg2k9ac9k24qufh.apps.googleusercontent.com"
    var redirect_uris = "http://localhost:3000/auth/google/callback"

    
    var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
    fs.readFile(TOKEN_PATH,async (err, token) => {
        if (err) return getAccessToken(oAuth2Client, listFiles);
        oAuth2Client.setCredentials(JSON.parse(token));
        listFiles(oAuth2Client).then((song_detail) =>{
          console.log(song_detail);
        });
      });
      function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client).then(console.log(files));
          });
        });
      }
      
      async function listFiles(auth) {
        const drive = google.drive({version: 'v3', auth});
        const res = await drive.files.list({
          pageSize: 100,
          fields: 'nextPageToken, files(id, name, webContentLink)',
        })
        //console.log(res.data.files);
        
        song_detail = res.data.files;
        return res.data.files;
      
      }
      return song_detail;
}



export default songsList;
