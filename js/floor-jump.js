
     /* 1-获取页面的标签 */
     let AllFloorJumpDiv = document.querySelectorAll(".floorJump-listBox");
     let AllFloorJumpList = document.querySelectorAll(".floorJump-list");
     /* 2-遍历便签，添加点击事件 */
     let timer;
     let gotoWd;
     for (let k = 0; k < AllFloorJumpList.length; k++) {
         AllFloorJumpList[k].index = k;


     AllFloorJumpList[k].onclick = function () {
         /* 当标签被点击，获取当前的便签 */
         self = this;
         console.log("当前索引=" + AllFloorJumpList[k].index);

         /* 用定时器实现滑动效果，每次加减40px */
         /* 为了防止定时器的叠加*/
         clearInterval(timer);
         timer = setInterval(function () {
             /* 做特殊处理，当出现特殊的窗口值（不是整数时）转换为整数 */
             gotoWd = Math.floor(window.scrollY / 45) * 45;
             if (gotoWd > self.index * 450) {
                 gotoWd -= 45;
             } else
             if (gotoWd < self.index * 450) {
                 gotoWd += 45;
             }
             /* 当跳转到指定位置的时候要清除定时器（否则会一直进行加或减） */
             if (gotoWd == self.index * 450) {
                 window.scrollTo(0, gotoWd);
                 clearInterval(timer);
             }
             /* 每5ms在当前基础上跳转40px */
             window.scrollTo(0, gotoWd);
         }, 5);
     };
     }
     //默认选中第一楼
     AllFloorJumpList[0].style.background = "#f90";
     /* 窗口滑动事件，当出现滑动时，判断当前的滚动条的Y值 */
     onscroll = function () {
         /* 排他 */
         for (let j = 0; j < AllFloorJumpList.length; j++) {
             AllFloorJumpList[j].style.background = "#f8f8f8";
         }
         let i = Math.floor(window.scrollY / 450);
         AllFloorJumpList[i].style.background = "#f90";
     }