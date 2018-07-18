var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
//카카오톡 파싱용 패키지

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//초기 상태 get '시작'' 버튼으로 시작
app.get('/keyboard', function(req, res){
  const menu = {
      "type": "buttons",
      "buttons": ["수강신청 일정", "강의 정보"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});


//카톡 메시지 처리
app.post('/message',function (req, res) {

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    //카톡으로 받은 메시지
    console.log(_obj.content)

    switch(_obj.content){
        case '수강신청 일정':
            send = {
                'message': {
                    'text': '  2018년도 2학기 수강신청 일정\n\n\▶강의시간표조회: 18.7.16(월)\n\n▶장바구니 1차:\n\t18.7.31(화)-8.1(수) 24시까지 (2일간)\n\n▶장바구니 수정(2차):\n\t18.8.7(화) 10:00-24:00\n\n▶수강신청:\n\t\t짝수학번:\n\t\t\t18.8.20(월) 10:00-18:00\n\t\t홀수학번:\n\t\t\t18.8.21(화) 10:00-18:00\n\t\t전체학번:\n\t\t\t18.8.22(수) 10:00-24:00\n\n▶18년도 2학기 개강: 18.9.3(월)\n\n▶수강정정:\n\t18.9.3(월) 10:00-9.8(토) 24:00\n\n▶수강취소:\n\t18.9.24(월) 10:00-9.30(일) 24:00'
                }
            }
    }
    res.json(send);
});

//9000포트 서버 ON
http.createServer(app).listen(3000, function() {
    console.log('서버실행중');
});