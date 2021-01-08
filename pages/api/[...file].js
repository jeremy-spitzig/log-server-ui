// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  let requestUrl = process.env.LOG_SERVER
  if(!requestUrl.endsWith('/')) {
    requestUrl += '/'
  }
  requestUrl += req.query.file.join('/')
  let params = []
  if(req.query.n) {
    params.push('n=' + req.query.n)
  }
  if(req.query.filter) {
    params.push('filter=' + req.query.filter)
  }
  if(params.length > 0) {
    requestUrl += '?' + params.join('&')
  }
  const result = await fetch(requestUrl)
  const text = await result.text()
  res.statusCode = result.status
  res.json({
    text
  })
}
