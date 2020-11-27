function Pool(size) {
    this.size = size;
    this.chan = [];
    this.timer = {};
}


Pool.prototype.add = function (id, cb, params) {
    var self = this;
    self.timer[id] = setInterval(function () {
        if (self.chan.length < self.size) {
            self.chan.push(1);
            cb(id, params)
            clearInterval(self.timer[id]);//停止等待
            delete self.timer[id];//清理内存垃圾
            // console.log(Object.keys(self.timer).length)
        }
    }, 100);
};

Pool.prototype.pop = function (id) {
    var self = this;
    self.chan.pop()
};


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

