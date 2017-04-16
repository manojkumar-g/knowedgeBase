const express = require('express')
const router = new express.Router()
import Story from './../db/models/Story';

router.post('/publish',(req,res)=>{
  let data = {
    ...req.body,
    title:req.body.data[0].data,
    comments:[],
    likedBy:[]
  }
  let newStory = new Story(data)
  newStory.save(
    err => {
      if(err)
        return res.status(400).json({err:'Error while saving'})
      return res.status(200).json({status:'SuccessFully published'})
    }
  )
}
)

router.get('/allPosts',(req,res) =>{
  Story.find({},function (err,data) {
        if (err) {
          console.error(err);
          res.response(500).send("Error while retreiveing all data");
        }
        if(!data){
          res.status(200).json({"Error":"No records found"});
        }
        else{
          res.status(200).json(data);
        }
      });
})
router.get("/getstory/:storyid",function (req,res) {
    var id = req.params.storyid;

      Story.find({_id:id},function (err,data) {
        if (err) {
          console.error(err);
          res.response(500).send("Error while retreiveing data by id");
        }
        if(!data){
          res.send("That Id doesn't exist");
        }
        else{
          res.json(data);
        }
      });
});

export default router
