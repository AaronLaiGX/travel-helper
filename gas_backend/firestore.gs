function firestoreFetchCollection_(collection) {
  const token = getAccessToken_();
  const url =
    `https://firestore.googleapis.com/v1/projects/` +
    `${CONFIG.PROJECT_ID}/databases/(default)/documents/${collection}`;

  const res = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    muteHttpExceptions: true,
  });
  
  const json = JSON.parse(res.getContentText());

  if (json.error) {
    throw new Error('Firestore Error: ' + JSON.stringify(json.error));
  }

  if (!json.documents) {
    return [];
  }

  return json.documents;
}