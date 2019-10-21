/* 01---交互效果：当用户点击关闭标签的时候支持关闭广告 */
$(() => {
    /* 给关闭标签添加点击事件 */
    
    
    $("#adv-close").click(function() {
        /* 获取当前标签的父标签关闭 */
        console.log(111111111111111111111);
        
        $(this).parent().slideUp(1000);
        // $(".topNav-adv").slideUp(1000);
    })
})
// $(".top-left-fistList>li").hover(function() {
//     $(this).children(".top-left-secList").stop().slideToggle(1000);
//     console.log($(this));
// })
// $(".top-left-fistList > li").hover(function() {
//     $(this).children(".top-left-secList").slideDown(1000);
// }, function() {
//     $(this).children(".top-left-secList").slideUp(1000);
// });
    
