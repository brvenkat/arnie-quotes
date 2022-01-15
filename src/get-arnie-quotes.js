const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  let responses
  const allRequests = urls.map(async (url) => httpGet(url))

  try {
    responses = await Promise.all(allRequests)
  } catch(e) {
    console.log("Error occured when recieving response ",e)
    throw e
  }

  return processArnieResponse(responses)
};

const processArnieResponse = (responses) => responses.reduce((output, currentEntry) => {
    let { body =  '{}'} = currentEntry
    const parsedResponse = JSON.parse(body)

    const responseData = parsedResponse && parsedResponse.message

    if (currentEntry.status === 200) {
      output.push({
        'Arnie Quote': responseData
      })
    } else {
      output.push({
        'FAILURE': responseData
      })
    }
    return output
  }, [])

module.exports = {
  getArnieQuotes,
};
