const express = require("express");
const router = express.Router();
const db=require("./db");
router.get("/lb",function(req,res){
    let file=fs.readFileSync("./server/lb-data.json")
    res.send(file)
})

module.exports = router;