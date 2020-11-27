var pool = new Pool(5);

function doReq(id, params) {
    //id 唯一值
    //params为请求参数
    $.get("http://localhost:5000/", params).done(function (result) {
        console.log("#end : ", id)
        pool.pop(id)
    }).fail(function () {
        // console.log("#end : ", id)
        // pool.pop(id)
    })
}


for (var i = 0; i < 20; i++) {
    console.log("#start : ", i)
    pool.add(i, doReq, {});
}
