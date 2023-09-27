const fetchData = async (url, info) => {
  // Fetch Main Data
  const request = await fetch(url, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Content_Type: 'application/json',
      },
      data: info,
  });
  const dataJson = await request.json();
  const data = dataJson.data;

  return data;
};

export default fetchData;