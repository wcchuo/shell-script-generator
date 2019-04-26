const express = require('express'),
      app = express(),
      cors = require('cors'),
      fs = require('fs-extra'),
      shell = require('shelljs'),
      body = require('body-parser'),
      moment = require('moment'),
      serveIndex = require('serve-index')
      path = 'shells',
      filename = 'shell.sh',
      port = 8080

fs.ensureDir(path)
app.use(cors());
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use('/', express.static('public'))
app.use('/shells', express.static(path), serveIndex(path, {'icons': true}))

app.listen(port, ()=>console.log(`app listening at port ${port}.`))

app.post('/post', (req, res)=>{
  let data = req.body
  console.log(data)
  generateShell(data)
  res.redirect('/shells')
})

var generateShell = (data)=>{
  let timeNow = moment().format("YYYY-MM-DD-HH-mm-ss")
  var script = ''
  for(i in data)
    script = script + data[i] + '\n'
  console.log(script)
  fs.outputFileSync(`${path}/${timeNow}-${filename}`, script)
}




