const fetchData = async (url, method = "GET", info, token = null) => {
  const headers = new Headers();
  headers.append("Accept", 'application/json');
  headers.append("Content-Type", 'application/json');
  
  if(token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  try {
    const request = await fetch(url, {
        method: method,
        headers: headers,
        body: info,
    });

    if(!request.ok) {
      throw new Error('Request failed');
    }

    const value = await request.json();
    return value;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default fetchData;