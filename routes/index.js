const express = require('express');
const router = express.Router();
const http = require('https');
const parseString = require('xml2js').parseString;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next) {
  // googleNewsのURL設定
  const opt = {
    host: 'news.google.com',
    port: 443,
    path: '/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja'
  };

  // HTTP通信後、APIに返却
  http.get(opt, (res2) => {
    let body = '';
    res2.on('data', (data) => {
      body += data;
    });
    res2.on('end', () =>{
      parseString(body.trim(), (err, result) => {
        let data = {
          title: 'Google News', 
          content: result.rss.channel[0].item
        };
      res.status(200);
      res.json(data);
      })
    })
  })
});

module.exports = router;

