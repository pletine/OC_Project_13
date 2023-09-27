const fetchData = async (url, info) => {
  const request = await fetch(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
  });
  
  const dataJson = await request.json();
  console.log(dataJson);

  return dataJson;
};

export default fetchData;