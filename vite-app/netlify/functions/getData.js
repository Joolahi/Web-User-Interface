
exports.handler = async (event, context) => {

  try {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    const quote = data;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ quote })
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
