$(() => {
    $.ajax({
        type: "post",
        url: "../server/getTowNavData.php",
        success(data) {
            var data = JSON.parse(data); //把字符串转换为数组
            // console.log("1111111111111",data);
            // 二级Nav
            let Oul = document.querySelector(".nav-list");     //getTowNavSpan() 获取二级的span
            let html = "";
            for (let i = 0; i < data.length; i++) {
                html += `
                <li class="list-li"> ${getTowNavSpan(data[i].title)}    
                    <div class="ThereNav">
                        <ul class="ThereNav-topList">
                            <li class="ThereNav-topList-li">手机频道</li>
                            <li class="ThereNav-topList-li">智能数码</li>
                            <li class="ThereNav-topList-li">以旧换新</li>
                            <li class="ThereNav-topList-li">网上营业厅</li>
                            <li class="ThereNav-topList-li">企业采购</li>
                            <li class="ThereNav-topList-li">苏宁国际</li>
                            <li class="ThereNav-topList-li">二手优品</li>
                        </ul>
                    </div>
                </li>
                
                `
            }
            Oul.innerHTML = html;
            // 三级Nav数据1---div的内容一
            $.ajax({
                type: "post",
                url: "../server/getThereNavData1.php",
                success(data1) {
                    var data1 = JSON.parse(data1);
                    console.log(data1);
                    let res = "";
                    for (let j = 0; j < data1.length; j++) {
                        res += ` 
                        <div class="thereList-Box">
                            <h4>${data1[j].title}</h4>
                            <ul class="thereList-ul">${getThereNavSpan(data1[j].list)}</ul>
                        </div>
                        `
                    }
                    // console.log(res);              //偶数循环添加
                    for (let k = 0; k < 15; k++) {
                        if (k % 2 == 0) {
                            document.querySelectorAll(".ThereNav")[k].innerHTML += res;
                        }

                    };
                }
            })
            // 三级数据2---div的内容二
            $.ajax({
                type: "post",
                url: "../server/getThereNavData2.php",
                success(data1) {
                    var data1 = JSON.parse(data1);
                    //console.log(data1);
                    let res = "";
                    for (let j = 0; j < data1.length; j++) {
                        res += ` 
                        <div class="thereList-Box">
                            <h4>${data1[j].title}</h4>
                            <ul class="thereList-ul">${getThereNavSpan(data1[j].list)}</ul>
                        </div>
                        `
                    }
                    //console.log(res);                 //奇数循环添加
                    for (let k = 0; k < 15; k++) {
                        if (k % 2 != 0) {
                            document.querySelectorAll(".ThereNav")[k].innerHTML += res;
                        }

                    };
                }
            })
        }
    })

    // 获取二级的span
    function getTowNavSpan(data) {
        // console.log(data);
        let res = JSON.parse(data); //数组
        let html = "";
        for (let i = 0; i < res.length; i++) {
            html += `
            <span>${res[i]}</span>`;
        }
        return html;
    }
    // 获取三级的li
    function getThereNavSpan(data) {
        // console.log(data);
        let res = JSON.parse(data); //数组
        let html = "";
        for (let i = 0; i < res.length; i++) {
            html += `
            <li class="thereList-li">${res[i]}</li>`;
        }
        return html;
    }
})