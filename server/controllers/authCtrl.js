import {User, Winner} from '../db/model.js'
import axios from 'axios';

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
    deleteAcct: async (req,res) => {
        const {email, userId} = req.session.user
        const {password} = req.body
        console.log('hit delete acct');

        const user = await User.findByPk(userId)
        if(user.password === password){
            await User.destroy({where: {email}})
            req.session.destroy()
            // use .destroy() with a where email clause to determine the account that needs to be deleted
            res.status(200).send('Account successfully deleted.')
        } else {
            res.status(401)
        }

        // determinei delete request
        // send status and message
    },
    editAcct: async (req,res) => {
        // destructure info from request from the front end
        const {email, fname, lname, oPassword, nPassword} = req.body
        const userId = req.session.user.userId 
        const user = await User.findByPk(userId)
        
        if (oPassword === user.password){
            console.log();
            user.set({
                email: email,
                fname: fname,
                lname: lname,
                password: nPassword
            })
            await user.save()
            res.status(200).send({message: 'Info updated'})

        } else {
            res.status(400).send({message: 'Invalid password'})
        }
        // if password matches what was found before, update the info to the req.body(using User.set())

        // if it works, send a 200 status. if it doesn't, send an error
    },
    requestRest: async (req,res) => {
        console.log(req.params);
        const options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/search',
            params: {
              latitude: req.params.latitude,
              longitude: req.params.longitude,
              sort_by: 'best_match',
              limit: '8'
            },
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer Hi4mm6R-ufsQA2bi2_vOrK7lqBWOR88MvEUG_ECje2Vhg23tZZQDAJNjSQ0wpFgtv3_FGbbGGfok8xPqVfcAV5iTqEEwl2S-F25yaOR57gooifE4N3Sc-Xk_L-C3ZXYx'
            }
          };
          
          let restInfo = []
          axios.request(options).then(res => {
            console.log(res.data.businesses);
            restInfo = res.data.businesses
            .map((rest) =>{
                return {
                    name: rest.name,
                    img: rest.img_url,
                    address: rest.location.display_address
                }
            })
            console.log(restInfo);
            res.status(200).send(restInfo)
          })
    }
}