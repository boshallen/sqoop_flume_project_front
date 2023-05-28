$(function () {
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', () => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        regpwd: value => {
            const password = $('#form_reg [name=password]').val()
            if (password !== value) return "两次密码不一致"
        }
    })

    // const baseUrl = `http://www.liulongbin.top:3007`
    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/register',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: res => {
                if (res.data === "error") return layer.msg(res.data)
                alert('注册成功')
                $('#link_login').click()
                location.href='/index.html'
            }
        })
    })
$('#form_login').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
        type:'POST',
        url: '/login',
        data:$(this).serialize(),
        success: res => {
            if(res.data === "error") return layer.msg(res.data)
            localStorage.setItem('token',res.data)
            localStorage.setItem('username',$('#form_reg [name=username]').val());
            localStorage.setItem('password',$('#form_reg [name=password]').val());
            console.log(res)
            location.href='/index.html'
        }
    })
})

})