const mongoose = require ('mongoose');

mongoose.connect ('mongodb://localhost/login');

let userSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    lastMidified: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '../public/images/1.jpg'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [0, -1, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        //是否有权限 是否可以评论 是否可以登录使用
        enum: [0, 1, 2],
        default: 0
    }

});

module.exports = mongoose.model ('User', userSchema);