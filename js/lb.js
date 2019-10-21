// 轮播图
        // 构造函数
        class LbManager {
            constructor(data,obj) {
                this.data = data;
                this.root = null;
                this.oBtnL = null;
                this.oBtnR = null;
                this.oDots = null;
                this.main = null;
                this.index = 0;
                this.timer = null;
                this.obj=obj;
            }
            init() {
                this.setBox();
                this.setBtn();
                this.setDot();
                this.cmain();
                this.inset();
                this.move();
                this.addevent();
                // console.log(this.oBox,this.oBtnL,this.oBtnR,this.oDots);

            }
            // 设置大框
            setBox() {
                this.root = document.createElement("div");
                this.root.className = "box";
            }
            // 设置左右箭头按钮
            setBtn() {
                this.oBtnL = document.createElement("span");
                this.oBtnL.innerHTML = "<";
                this.oBtnL.className = "leftbtn";
                this.oBtnR = document.createElement("span");
                this.oBtnR.innerHTML = ">";
                this.oBtnR.className = "rightbtn";
            }
            // 设置小圆点部分----(div+内容（圆点数与lb图片数相同）+默认显示状态)
            setDot() {
                this.oDots = document.createElement("div");
                this.oDots.className = "dotbox";
                for (let i = 0; i < this.data.imgs.length; i++) {
                    this.oDots.innerHTML += `
                <span></span>`
                }
                this.oDots.querySelectorAll("span")[0].className = "active";
            }
            // 设置图片内容-------(div+内容+默认显示状态)
            cmain() {
                this.main = document.createElement("div");
                for (let i = 0; i < this.data.imgs.length; i++) {
                    this.main.innerHTML += `
                <img src="${this.data.imgs[i]}">
                `
                }
                this.main.querySelectorAll("img")[0].className = "cur";
            }
            // 插入页面并显示
            inset() {
                this.root.appendChild(this.oBtnL);
                this.root.appendChild(this.oBtnR);
                this.root.appendChild(this.oDots);
                this.root.appendChild(this.main);
                this.obj.appendChild(this.root);
            }
            // 自动播放            事件一：（排它+临界点）
            move() {
                // 获取操作对象
                let imgs = this.main.querySelectorAll("img"); /* 从main获取imgs */
                let dots = this.oDots.querySelectorAll("span");
                this.col=["#1d75fb","#362ee6","#af232c","#7d02c2","#c9cdf0","#9566f2","#34b3f8","#444fe9"];

                // 自动播放(根据索引按顺序循环显示图，加样式让其显示)
                this.timer = setInterval(() => {
                    $(".index-lb-warp").css("background",this.col[this.index]);
                    //console.log($(".index-lb-warp"));
                    /* 排它，清除 */
                    this.clear();
                    imgs[this.index].className = "cur";
                    dots[this.index].className = "active";
                    this.index += 1;
                    this.index > imgs.length - 1 ? this.index = 0 : this.index;
                }, 2000)
            }
            clear() {
                // 清除样式（循环）
                let imgs = this.main.querySelectorAll("img");
                let dots = this.oDots.querySelectorAll("span");
                for (let i = 0; i < this.data.imgs.length; i++) {
                    imgs[i].className = "";
                    dots[i].className = "";
                }
            }
            addevent() {
                // 监听事件（鼠标点击左右箭头）
                // 获取图+圆点标签
                let imgs = this.main.querySelectorAll("img");
                let dots = this.oDots.querySelectorAll("span");
                // 右箭头点击事件(正序，索引+，清除所有样式，给当前添加样式)
                this.oBtnR.onclick = () => {
                    console.log("右箭头this.index=",this.index);
                    this.index += 1;
                    this.index > imgs.length - 1 ? this.index = 0 : this.index; /* * */
                    this.clear();
                    $(".index-lb-warp").css("background",this.col[this.index]);
                    imgs[this.index].className = "cur";
                    dots[this.index].className = "active";

                }
                // 左箭头
                this.oBtnL.onclick = () => {
                    console.log("左箭头this.index=",this.index);
                    this.index -= 1;
                    this.index < 0 ? this.index = imgs.length - 1 : this.index;
                    this.clear();
                    $(".index-lb-warp").css("background",this.col[this.index]);
                    imgs[this.index].className = "cur";
                    dots[this.index].className = "active";

                }
                // 鼠标移入清除自动播放
                this.root.onmouseover = () => {
                    clearInterval(this.timer)
                }
                // 鼠标移除继续继续播放
                this.root.onmouseout = () => {
                    this.move();
                }
                // 点击小圆点样式 事件四
                for (let i = 0; i < imgs.length; i++) {
                    /* 不能用i，因不能与外部index同步 */
                    dots[i].onclick = () => {
                        this.index = i;
                        console.log("点击小圆点this.index=",this.index);
                        this.clear();
                        $(".index-lb-warp").css("background",this.col[this.index]);
                        imgs[this.index].className = "cur";
                        dots[this.index].className = "active";
                    }
                }
            }
        }


