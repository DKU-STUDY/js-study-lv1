const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const config = require('./config/key') // mongoDB URI를 보호하기 위한 설정파일
const { Item } = require('./Item')

app.use(express.json()) // body-parser 대신 사용

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

/**
 * 아이템 조회
 */
app.get('/api/items', (req, res) => {
    const items = Item.find({}, (err, items) => {
        if(err) return res.status(500).json({success: false, err})
        if(items.length === 0){
            return res.json({
                success: true,
                message: "아이템이 없습니다."
            })
        }
        res.status(200).json({success: true, message: "아이템 조회 성공", items})
    })
})


/**
 * 아이템 추가
 * 
 * 요청의 header에 Content-Type: application/json 설정해주기
 * 요청의 body는 JSON이고 예시는 다음과 같음
 * { "content": "todo item2" }
 */
app.post('/api/items', (req, res) => {
    const item = new Item({
        content: req.body.content,
        completed: req.body.completed,
        createdAt: Date.now()
    })

    item.save((err, item) => {
        if(err) return res.status(500).json({success: false, err})
        return res.status(200).json({success: true, message: "아이템 추가 성공", item})
    })
})

/**
 * 아이템 내용 수정
 * 
 * 요청시 URI에 (mongoDB에서 자동생성)_id를 붙여 요청
 * 요청의 body에는 수정할 내용을 작성
 */
app.put('/api/items/:itemId', (req, res) => {
    Item.findByIdAndUpdate(
        req.params.itemId, // itemId로 찾기
        {$set: {'content': req.body.content}},
        {'new': true}, // 수정된 document를 반환하도록 new 옵션을 true로 설정한다.
        (err, item) => {
            if(err) return res.status(500).json({success: false, err})
            return res.status(200).json({success: true, message: "아이템 내용 수정 성공", item})
        }
    )
})

/**
 * 아이템 토글
 */
app.put('/api/items/toggle/:itemId', (req, res) => {
    const item = Item.findById(req.params.itemId)
    // item.completed = !item.completed
    Item.findByIdAndUpdate(
        req.params.itemId,
        {$set: {completed: !item.completed}},
        {'new': true},
        (err, item) => {
            if(err) return res.status(500).json({success: false, err})
            return res.status(200).json({success: true, message: "아이템 토글 성공", item})
        }
    )
})

/**
 * 아이템 삭제
 */
app.delete('/api/items/:itemId', (req, res) => {
    Item.findByIdAndDelete(
        req.params.itemId,
        (err, item) => {
            if(err) return res.status(500).json({success: false, err})
            return res.status(200).json({success: true, message: "아이템 삭제 성공", item})
        }
    )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
