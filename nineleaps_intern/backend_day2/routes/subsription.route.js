import {Router} from 'express';

const subsriptionRouter=Router()
subsriptionRouter.get('/',(req,res)=>{
    res.send({
        title:'get all subsription'
    })
})
subsriptionRouter.get('/:id',(req,res)=>{
    res.send({
        title:'get subsription details'
    })
})
subsriptionRouter.post('/',(req,res)=>{
    res.send({
        title:'create new subsription'
    })
})
subsriptionRouter.put('/:id',(req,res)=>{
    res.send({
        title:'update subsription'
    })
})
subsriptionRouter.delete('/:id',(req,res)=>{
    res.send({
        title:' delete subsription'
    })
})
subsriptionRouter.put('/:id/cancel',(req,res)=>{
    res.send({
        title:' cancel subsription'
    })
})
subsriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({
        title:' get upcoming renewals subsription'
    })
})
subsriptionRouter.delete('/user/:id',(req,res)=>{
    res.send({
        title:' get all user subsription'
    })
})
export default subsriptionRouter;