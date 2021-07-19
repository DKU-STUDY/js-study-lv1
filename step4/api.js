const express = require('express')
const router = express.Router();
const fs = require('fs');
const { v1: uuidv1 } = require('uuid'); // 고유 id를 생성해주는 uuid 사용
const {body, validationResult} = require('express-validator');


// const jsonFile = fs.readFileSync('./data.json', 'utf-8'); // json string 그대로의 파일
// console.log(jsonFile)
// const items = JSON.parse(jsonFile).items // json을 object type으로 변환 
// console.log(items)

// const ID = uuidv1(); // 고유 id 생성
// console.log(ID)

/**
 * 아이템 조회
 */
router.get('/items', (req, res, next) => {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8', (err) => {
        if(err) next(err)
    }))

    res.status(200).json({items: data.items, selectedItem: data.selectedItem});
    
})


// 현재 body에 content에 대한 내용을 넣지 않아도 에러 없이 처리됨(수정 필요 - 특정 에러핸들러를 만들어야되나?) express-validator로 해결 완료
/**
 * 아이템 추가
 */
router.post('/items', 
    body('content').trim().isLength({min:1, max:50}),
    (req, res, next) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const items = JSON.parse(fs.readFileSync('./data.json', 'utf-8')).items

        // throw new Error('broken')

        items.push({
            id: uuidv1(),
            content: req.body.content,
            completed: false,
            createdAt: Date.now()
        })
        fs.writeFileSync(
            './data.json',
            JSON.stringify({items}),
            (err) => {
                if(err) next(err)
            }
        )
        
        // console.log(data)
        return res.json({message: 'success'})
})


/**
 * 아이템 수정 모드 바꾸기(selectedItem값 변화시)
 */
 router.put('/items', (req, res, next) => {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

    // 해제시 itemId: -1, 수정모드시 itemId: 선택된 아이템의 id
    data.selectedItem = req.body.selectedItem;

    fs.writeFileSync(
        './data.json',
        JSON.stringify(data),
        (err) => {
            if(err) next(err)
        }
    )
    return res.json({message: 'success'})
})


/**
 * 아이템 수정
 */
 router.put('/items/:itemId', 
 body('content').trim().isLength({min:1, max:50}),
 (req, res, next) => {

     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()})
     }
     const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8', (err) => {
        if(err) next(err)
    }));

     
     const foundIndex = data.items.findIndex(element => element.id === req.params.itemId);
     console.log(foundIndex);

    const newContent = {
        content: req.body.content
    }

     data.items[foundIndex] = {...data.items[foundIndex], ...newContent};
     data.selectedItem = -1;
     console.log(data);
     
     fs.writeFileSync(
        './data.json',
        JSON.stringify(data),
        (err) => {
            if(err) next(err)
        }
    )
     return res.json({message: 'success'})
})


/**
 * 아이템 토글
 */


/**
 * 아이템 삭제
 */



module.exports = router