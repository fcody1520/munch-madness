import {User, Winner} from '../db/model.js'

export default {
    login: async (req,res) => {
        console.log('hit login');
        const {email, password} = req.body
        const user = await User.findOne({where: {email: email}})
        if(user){
            const {userId, fname, lname} = user;
            if (password === user.password){
                req.session.user = {userId, fname, lname, email}
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send({message: 'Invalid Password'})
            }
        } else {
            res.status(404).send({message: 'Invalid email, try again'})
        }
    },
    register: async (req,res) => {
        console.log('hit register');
        // check to see if fname, lname, email, password exist in db
        const {email,fname,lname,password} = req.body
        if (!email || !fname || !lname || !password){
            res.status(406).send('All fields requried to register')
            return
        }
        const userExists = await User.findOne({where: {email: email}})
        if (!userExists){
            await User.create({
                email,
                fname,
                lname,
                password
            })

            res.status(200).send('Sign up Successful!')
        } else {
            res.status(409).send('User already exists')
        }
        // is email in db, if it is, send that a conflict(409)
        // if no email exists, create user
        // send status code
    },
    logout: async (req,res) => {
        req.session.destroy()
        res.status(200).send('Successfully logged out!')
    },
    
}