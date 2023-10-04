
var list = [];
var index = 0; // 保存当前播放的歌曲索引，默认0

console.log("music.json")
// 加载音乐列表信息（本地json）
$.ajax({
    type: "GET",
    url: "./res/music/music.json",
    dataType: "json",
    success: function (data) {
        // console.log(data)
        list = data.list;
        render(list[index]);
        renderList();
    }
})

// // 加载音乐列表信息（服务器Get请求）
// $.ajax({
//     type: "GET",
//     url: "server-host-url",
//     dataType: "json",
//     success: function(data){
//         list = data.list;
//         render(list[index]);
//         renderList();
//     }
// })

// 根据信息，设置页面对应标签内容
function render(data) {
    $(".name").text(data.name);
    $(".singer").text(data.singer + ' - ' + data.album);
    $(".end").text(data.time);
    $(".cover img").attr("src", data.cover);
    $("audio").attr("src", data.url);
    $(".mask_bg").css({
        background: `url(${data.cover}) no-repeat center center`,
        "background-size": "cover",
    });
}

// 切换歌曲
function changeSong() {
    var flag = !$("audio").get(0).paused;

    // 更新状态
    render(list[index])

    // 保持暂停/播放的状态
    if (flag) {
        $("audio").get(0).play();
    }
}

// 格式化时间（62s->01:02）
function formatTime(time) {
    var m = parseInt(time / 60);
    var s = parseInt(time % 60);
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return `${m}:${s}`;
}

// 根据数据动态生成li标签
function renderList() {
    // 清空
    $(".list").empty();

    // 遍历list
    for (let i = 0; i < list.length; i++) {
        var j; // 用于拼接序号的索引
        if (i + 1 < 10) {
            j = "0" + (i + 1)
        }
        else {
            j = i + 1;
        }

        // li标签
        var $li = $(`
            <li class="${i == index ? "playing" : ""}" >
                <span>${j}.${list[i].name} - ${list[i].singer}</span>
                <span class="fa ${i == index && !$("audio").get(0).paused
                ? "fa-pause-circle"
                : "fa-play-circle"
            } play"
                      data-index="${i}">
                </span>
            </li>
        `)

        // 添加到ul中
        $(".list").append($li);
    }
}


/*
 * 上一曲点击事件
 *
 */
$("#lastBtn").on("click", function () {
    // index向前推
    if (index == 0) {
        index = list.length - 1;
    }
    else {
        index = index - 1;
    }

    changeSong();
})


/*
 * 播放暂停点击事件
 *
 */
$("#playBtn").on("click", function () {
    // 暂停状态
    if ($("audio").get(0).paused) {
        // 改变图标
        $(this).removeClass("fa-play");
        $(this).addClass("fa-pause");

        // 音乐卡信息
        $(".player-info").animate({
            top: "-100%",
            opacity: 1
        }, "slow")

        // 旋转唱片
        $(".cover").css({
            "animation-play-state": "running"
        })

        // 播放音乐
        $("audio").get(0).play();
    }
    else {
        // 播放状态
        $(this).removeClass("fa-pause")
        $(this).addClass("fa-play")

        $(".player-info").animate({
            top: "0%",
            opacity: 0
        }, "slow")

        $(".cover").css({
            "animation-play-state": "paused"
        })
        

        $("audio").get(0).pause();
    }
})


/*
 * 下一曲点击事件
 *
 */
$("#nextBtn").on("click", function () {
    // index向后推
    if (index == list.length - 1) {
        index = 0;
    }
    else {
        index = index + 1;
    }

    changeSong();
})


/*
 * 模态框点击事件
 *
 */
$("#modalBtn").on("click", function () {
    renderList();
    $(".modal").css({
        display: "block"
    })
})


/*
 * 取消按钮点击事件
 *
 */
$("#closeBtn").on("click", function () {
    $(".modal").css({
        display: "none"
    })
})


/*
 * 监听audio标签的timeupdate事件
 *
 */
$("audio").on("timeupdate", function () {
    var currentTime = $("audio").get(0).currentTime;
    var totalTime = $("audio").get(0).duration;

    // 时间
    $(".start").text(formatTime(currentTime))

    // 进度条
    var percent = currentTime / totalTime * 100;
    // console.log(percent)
    $(".line").css({
        width: percent + "%"
    })
})


/*
 * 监听audio标签的ended事件
 *
 */
$("audio").on("ended", function(){
    $("#playBtn").removeClass("fa-pause");
    $("#playBtn").addClass("fa-play");

    // 延迟300ms观感更好
    setTimeout(function () {
        $(".line").css({
            width: "0%"
        })

        $(".start").text("00:00")
        // 封面停止旋转
        $(".cover").css({
            "animation-play-state": "paused"
        })
    }, 300)
})


/*
 * 通过事件绑定给音乐列表播放按钮绑定点击事件
 *
 */
$(".list").on("click", ".play", function () {
    if ($(this).hasClass("fa-pause-circle")) {
        // 点击播放中的按钮 暂停
        $("#playBtn").trigger("click"); // 触发器

        $(this).removeClass("fa-pause-circle");
        $(this).addClass("fa-play-circle");
    }
    else{
        // 点击未播放中的按钮 播放对应歌曲
        var i = $(this).attr("data-index");
        index = i; // 更新索引
        // 更新界面
        render(list[i])
        $("#playBtn").trigger("click"); // 触发器

        $(this).removeClass("fa-play-circle");
        $(this).addClass("fa-pause-circle");
        
        // 更新列表
        renderList();
    }
})
