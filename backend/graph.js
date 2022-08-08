// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const fs = require("fs");

const { OneDriveLargeFileUploadTask, StreamUpload, FileUpload } = require("@microsoft/microsoft-graph-client");
var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

module.exports = {
  getUserDetails: async function(msalClient, userId) {
    const client = getAuthenticatedClient(msalClient, userId);

    const user = await client
      .api('/me')
      .select('displayName,mail,mailboxSettings,userPrincipalName')
      .get();
    return user;
  },
  getFileDetails: async function(msalClient, userId) {
    
    const client = getAuthenticatedClient(msalClient, userId);
    
    const data = await client
      .api('/me/drive/root:/Music:/children?$expand=thumbnails&$top=500')
      .get();
    
    const newdata = [];
    //data.value.map(dt => newdata.push({"tn":(dt.thumbnails.length==0)?[]:dt.thumbnails[0].large.url}))
    data.value.map(dt => newdata.push({"id": dt.id, "name":dt.description, "alt_name":dt.name, "metadata" :dt.audio,"webContentLink" : dt['@microsoft.graph.downloadUrl'], "thumbnail":(dt.thumbnails.length==0)?[]:dt.thumbnails[0].large.url }));
    //console.log(newdata);
    

    return newdata;
  },
  uploadFile: async function(msalClient, userId, mp3file) {
    
    const client = getAuthenticatedClient(msalClient, userId);
    await upload(client,mp3file)
    .then((uploadResult) => {
      console.log("return at func UploadFile of graph.js");
      return uploadResult;
    })
    .catch((error) => console.log(error));
    
  },
  
};

function getAuthenticatedClient(msalClient, userId) {
  if (!msalClient || !userId) {
    throw new Error(
      `Invalid MSAL state. Client: ${msalClient ? 'present' : 'missing'}, User ID: ${userId ? 'present' : 'missing'}`);
  }

  // Initialize Graph client
  const client = graph.Client.init({
    // Implement an auth provider that gets a token
    // from the app's MSAL instance
    authProvider: async (done) => {
      try {
        // Get the user's account
        const account = await msalClient
          .getTokenCache()
          .getAccountByHomeId(userId);

        if (account) {
          // Attempt to get the token silently
          // This method uses the token cache and
          // refreshes expired tokens as needed
          const response = await msalClient.acquireTokenSilent({
            scopes: process.env.OAUTH_SCOPES.split(','),
            redirectUri: process.env.OAUTH_REDIRECT_URI,
            account: account
          });

          // First param to callback is the error,
          // Set to null in success case
          done(null, response.accessToken);
        }
      } catch (err) {
        console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        done(err, null);
      }
    }
  });

  return client;
}
async function upload(client,mp3file) {
	const fileName = mp3file.name;
  console.log("At upload func of graph.js");
	const progress = (range, extraCallbackParam) => {
		// implement the progress callback here
		console.log("uploading range: ", range);
		console.log(extraCallbackParam);
		return true;
	};
	const options = {
    path: "/Documents",
		fileName,
		conflictBehavior: "rename",
		rangeSize: 1024 * 1024,
		
	};
  //console.log("start",fileObject,"finish");
	//OR
	// You can also use a FileUpload instance
	//const file = fs.readFileSync();
	//const fileObject = new FileUpload(file, fileName, totalsize);

	//OR
	// You can also create an object from a custom implementation of the FileObject interface
  try {
    
    const fileObject = new FileUpload(mp3file.data, mp3file.name, mp3file.size);
    
    const task = await OneDriveLargeFileUploadTask.createTaskWithFileObject(client, fileObject, options);

    const uploadResult = await task.upload();
    console.log("got upload confirmation");
    return uploadResult;
    
  } catch (error) {
    console.log(error);
    return error;
  }
	return null;
	
}