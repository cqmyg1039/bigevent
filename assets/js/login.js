$(function () {
    /* 点击去注册账号 , 隐藏登录区域 */
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    /* 点击去登录账号 , 隐藏注册区域 */
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    /* 自定义验证规则 */
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位,且不能输入空格"
        ],
        /* 校验俩次密码是否一致的规则 */
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return "两次密码输入不一致,请重新输入"
            }
        }
    })
    /* 注册功能 */
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功,请登录!");
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("登录成功")
                console.log(res)
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        })
    })
})