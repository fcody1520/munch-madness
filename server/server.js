import express from 'express'
import session from 'express-session'
import viteExpress from 'vite-express'
import authCtrl from './controllers/authCtrl.js'

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({secret: 'punkface', saveUninitialized:true, resave: false}))


function loginRequired(req, res, next){
    if (!req.session.user.userId){
        res.status(401).send({message: 'Unauthorized'})
    } else{ 
        next()
    }
}

app.get('/user', (req,res)=>{
    res.status(200).send(req.session.user)
})

const { login, register, logout, deleteAcct, editAcct,requestRest,postWinner,getWinners } = authCtrl
app.post('/login', login)

app.post('/register', register)

app.delete('/logout',loginRequired, logout)


app.put('/delete-user',loginRequired, deleteAcct)

app.put('/edit-user',loginRequired, editAcct)

app.get('/restaurants/:latitude/:longitude', requestRest)

app.post('/restaurants', loginRequired, postWinner)

app.get('/winners', loginRequired, getWinners)


viteExpress.listen(app, 8000, () => console.log(`Server is listening on port 8000`))