const fetchData = async (url, method, info) => {
  const request = await fetch(url, {
      method: method,
      headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
      },
      body: info,
  });
  const dataJson = await request.json();

  return dataJson;
};

export default fetchData;