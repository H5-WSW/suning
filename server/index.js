const express=require("express")

const router=express.Router();

const getGoodsData=require("./getGoodsData")
const getLikeDate=require("./getLikeDate")
const getPageCount=require("./getPageCount")
const getRepeatData=require("./getRepeatData")

const getShopList=require("./getShopList")
const getThereNavData1=require("./getThereNavData1")
const getThereNavData2=require("./getThereNavData2")
const getTimeLimit=require("./getTimeLimit")

const getTowNavData=require("./getTowNavData")
const indexlb=require("./index-lb")
const login=require("./login")
const register=require("./register")



router.use(getGoodsData)
router.use(getLikeDate)
router.use(getPageCount)
router.use(getRepeatData)

router.use(getShopList)
router.use(getThereNavData1)
router.use(getThereNavData2)
router.use(getTimeLimit)

router.use(getTowNavData)
router.use(indexlb)
router.use(login)
router.use(register)


module.exports=router





