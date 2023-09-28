const fetchData = async (url, method = "GET", info, token = null) => {
  const headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append("Content-Type", 'application/json');
  
  if(token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const request = await fetch(url, {
      method: method,
      headers: headers,
      body: info,
  });
  const dataJson = await request.json();

  return dataJson;
};

export default fetchData;