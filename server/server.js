import express from 'express'
import session from 'express-session'
import viteExpress from 'vite-express'
import authCtrl from './controllers/authCtrl.js'

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({secret: 'punkface', saveUninitialized:true, resave: false}))

app.get('/user', (req,res)=>{
    // console.log('hit check user');

    res.status(200).send(req.session.user)
})

const {login,register, logout} = authCtrl
app.post('/login', login)

app.post('/register', register)

app.delete('/logout', logout)



viteExpress.listen(app, 8000, () => console.log(`Server is listening on port 8000`))