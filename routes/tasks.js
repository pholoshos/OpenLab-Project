const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('get');
});

router.get('/all',(req,res)=>{
    res.send('delete');
});


router.post('/',(req,res)=>{
    res.send('create');
});

router.post('/delete',(req,res)=>{
    res.send('delete');
});

router.post('/edit',(req,res)=>{
    res.send('edit');
});

router.post('/complete',(req,res)=>{
    res.send('complete');
});




module.exports = router;