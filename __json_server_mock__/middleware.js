module.exports = (req, res, next) => {
    if(req.method === 'POST' && req.path === '/login') {
        if(req.body.username === 'kun' && req.body.password === '123456') {
            return res.status(200).json({
                user: {
                    token: '123456-token'
                }
            })
        } else {
            return res.status(400).json({messages: '用户名或密码错误'})
        }
    }

    next()
}
