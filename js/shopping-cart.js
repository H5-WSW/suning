$(() => {
    new Promise(function (resole, reject) {        //?
        $.ajax({
            type: "get",
            url: "../server/getShopList.php",
            success: (data) => {
                let index = 0;
                // console.log(index);
                // JSON.parse(data)                         从data截取25个数据，分成3个页面显示（i循环，创建3个ul），每个页面显示10条数据（j循环，渲染10个li）
                let res = JSON.parse(data).splice(25, 50);  //将数据转换成js对象
                for (let i = 0; i < 3; i++) {               //循环出三个ul
                    let Oul = document.createElement("ul");
                    let html = "";

                    for (let j = 0; j < 10; j++) {          //每个ul存10个li,i*10+j  使得i=1时，可拿到数据10以后的数据
                        // console.log(i,j);
                        html += `
                        <li class="item">
                            <img src=${res[i*10+j].src}>
                            <div class="price">￥
                                <i class="price-style"> ${res[i*10+j].price}.00</i>
                            </div>
                            <div class="title">
                                <i class="store-class zy">苏宁自营</i>
                                ${res[i*10+j].title}</div>
                            
                            <a href="#" class="btn-db"><i></i>加入购物车</a>
                        </li>
                        `;
                        if (i == 2 && j == 4) {
                            break;
                        }
                    }
                    Oul.innerHTML = html;
                    $(".page-list").append(Oul);
                }
                // 默认第一个ul显示
                $(".page-list ul").eq(0).addClass("current");


                // 点击事件
                // 左箭头，index==ul的索引,index>0时，可点击时显示被隐藏的下一个ul（index--）
                $(".arrow").eq(0).click(function (e) {

                    if (index > 0) {
                        index--;
                        $(".page-list ul").eq(index).addClass("current").siblings().removeClass("current");

                    } else if (index <= 0) {
                        index = 2;
                        $(".page-list ul").eq(index).addClass("current").siblings().removeClass("current");
                    };
                    console.log("left", index);
                    e.preventDefault() //阻止a标签点击时默认跳转的事件
                });
                // 右箭头
                $(".arrow").eq(1).click(function (e) {

                    if (index < 2) {
                        index++;
                        $(".page-list ul").eq(index).addClass("current").siblings().removeClass("current");

                    } else if (index >= 2) {
                        index = 0;
                        $(".page-list ul").eq(index).addClass("current").siblings().removeClass("current");
                    };
                    console.log("right", index);
                    e.preventDefault()
                });
                // 购物车的点击事件，点击后自动添加购物栏显示到页面
                $(".btn-db").click(function () {
                    let Oimg = $(this).siblings("img")[0].src;
                    let Odes = $(this).siblings(".title")[0].innerText.slice(4);
                    let Oprice = $(this).siblings(".price").text();
                    console.log(Oprice);

                    let html = `
                    <li>
                        <input class="cart-ipt" type="checkbox"  checked="checked">
                        <a class="cart-img" href=""><img src=${Oimg} alt=""></a>
                        <p class="cart-des">${Odes}</p>
                        <span class="cart-priceOne">${Oprice}</span>
                        <div class="cart-num">
                            <i class="num-dec">-</i>
                            <span class="num-sum"> 1 </span>
                            <i class="num-add">+</i>
                        </div>
                        <span class="cart-sum">${Oprice}</span>
                        <span class="cart-del">删除</span>
                    </li>
                    `
                    document.querySelector(".cart ul").innerHTML += html;
                    console.log($(this).siblings("img"));
                    // 计算总计
                    addPrice();
                    addAmount();


                    // 数量--加减点击事件
                    $(".num-dec").click(function () {
                        let numVul = $(this).siblings("span").text();
                        let onePrice = $(this).parent().siblings(".cart-priceOne").text();
                        console.log(numVul, onePrice.slice(1).trim() * numVul);

                        if (numVul > 0) {

                            $(this).siblings("span").text(numVul - 1);
                            console.log(onePrice.slice(1).trim(), numVul);

                            $(this).parent().siblings(".cart-sum").text("￥" + onePrice.slice(1).trim() * (numVul - 1) + ".00");
                        }
                        console.log(numVul);
                        addPrice();
                        addAmount();
                    });

                    $(".num-add").click(function () {
                        let onePrice = $(this).parent().siblings(".cart-priceOne").text();
                        let numVul = $(this).siblings("span").text();

                        $(this).siblings("span").text(numVul * 1 + 1);
                        $(this).parent().siblings(".cart-sum").text("￥" + onePrice.slice(1).trim() * (numVul * 1 + 1) + ".00");
                        console.log(numVul);
                        addPrice();
                        addAmount();
                    })

                    // 删除--按钮，移出ul
                    $(".cart-del").click(function () {
                        this.parentNode.parentNode.removeChild(this.parentNode);
                    })
                    // var len = $(".cart li").length;
                    // var sum = Array.from($(".cart .cart-sum")).reduce(function (a, b) {
                    //     return a.innerText.slice(1).trim() + b.innerText.slice(1).trim();
                    // })

                    
                    // 设置全选
                    $(".J-AllCheckBox")[0].checked = true;
                    $(".J-AllCheckBox")[1].checked = true;
                    $(".cart-ipt").click(function () {
                        $(".J-AllCheckBox")[0].checked = true;
                        $(".J-AllCheckBox")[1].checked = true;
                        for (let i = 0; i < $(".cart-ipt").length; i++) {
                            if (!$(".cart-ipt")[i].checked) {
                                $(".J-AllCheckBox")[0].checked = false;
                                $(".J-AllCheckBox")[1].checked = false;
                            }
                        }
                        addAmount();
                    })
                    $(".J-AllCheckBox").click(function () {
                        console.log(3333333333);

                        if (this.checked) {
                            $(".J-AllCheckBox")[0].checked = true;
                            $(".J-AllCheckBox")[1].checked = true;
                            for (let i = 0; i < $(".cart-ipt").length; i++) {
                                $(".cart-ipt")[i].checked = true;
                                console.log(i);
                            }
                        } else {
                            $(".J-AllCheckBox")[0].checked = false;
                            $(".J-AllCheckBox")[1].checked = false;
                            for (let i = 0; i < $(".cart-ipt").length; i++) {
                                $(".cart-ipt")[i].checked = false;
                            }
                        }

                    })
 
                }) 
                // 计算总价
                function addPrice(){
                    let sum = 0;
                    let Oneprice = document.querySelectorAll(".cart-sum");
                    for(let i=0 ,len=Oneprice.length; i<len; i++){
                       sum += Oneprice[i].innerText.slice(1,-3)*1
                        
                    }
                    console.log(sum);
                    $(".allAdd-priace").text("￥"+sum+".00");
                };
                // 计算总量函数
                function addAmount(){
                    let sum = 0;
                    let Oamount = document.querySelectorAll(".num-sum");
                    let allAmount = document.querySelector(".search-mou");
                    let Oipt = document.querySelectorAll(".cart-ipt");
                    for(let i =0; i<Oamount.length; i++){
                        // console.log(Oamount[i].innerText*1,"--------------");
                        // console.log("allAmount.innerText=",allAmount.innerText,"Oamount[i].innerText*1=",Oamount[i].innerText*1);
                        if(Oipt[i].checked){
                        sum +=Oamount[i].innerText*1; 
                        }
                        
                    }
                    console.log(sum);
                    allAmount.innerText=sum;
                }

            }
        })
    })
})


// $("").click(function(){
//     if(this.checked){

//     }
//     document.querySelectorAll()
// })






// ${data[i*10+j].price}  每次循环在前面的基础上获取接着获取后面的数据