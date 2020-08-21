// $(function () {
//     var form = layui.form;
//     form.verify({
//         nickname: function (value) {
//             if (value.length > 6) {
//                 return "昵称长度为1~6位之间"
//             }
//         }
//     })

//     initUserInfo();
//     var form = layui.form;

//     function initUserInfo() {
//         $.ajax({
//             method: 'GET',
//             url: '/my/userinfo',
//             success: function (res) {
//                 console.log(res);
//                 if (res.status !== 0) {
//                     return layer.msg(res.message)
//                 }
//                 form.val('formUserInfo', res.data)
//             }
//         })
//     }

//     $("#btnReset").on("click", function (e) {
//         e.preventDefault();
//         initUserInfo()
//     })

//     $(".layui-form").on("submit", function (e) {
//         e.preventDefault();
//         $.ajax({
//             method: 'POST',
//             url: '/my/userinfo',
//             data: $(this).serialize(),
//             success: function (res) {
//             /* console.log(res); */
//                 if (res, status !== 0) {
//                     return layer.msg(res.message);
//                 }
//                 layer.msg("恭喜您,修改成功!");
//                 window.parent.getUserInof();
//             }
//         })
//     })
$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "原密码与新密码不能相同"
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "俩次密码输入不一致"
            }
        }
    })
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改密码成功");
                $(".layui-form")[0].reset();
            }
        })
    })
})




















// })