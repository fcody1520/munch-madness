import {User, sequelize, Winner} from '../server/db/model.js'

const users = [
    {
        email: 'sample1@q.com',
        password: 'asdf1234',
        fname: 'Sam',
        lname: 'ple'
    },
    {
        email: 'test@q.com',
        password: 'asdf1234',
        fname: 'Tes',
        lname: 'ting'
    }
]

const winners = [
    {
        restName: 'Burger King',
        restAddress: '123 Easy St',
        restImg: 'https://media.istockphoto.com/id/1168054109/photo/burger-king.jpg?s=612x612&w=0&k=20&c=j2iNcF_c4L7eBXIpxW6AHk63j-r5df6dO-9w85GFYbs=',
        userId: 1
    },
    {
        restName: 'Pizza Hut',
        restAddress: '2468 Poop St',
        restImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6vFvm92yFaw6CFeZR5l_dPQRhWixmNz_OQ&usqp=CAU',
        userId: 1
    },
    {
        restName: 'Taco Bell',
        restAddress: '369 Dang You Fine Ave',
        restImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvlcFlUgICgQT1Gk8Tw5Y_h-OcQBUTaogCQA&usqp=CAU',
        userId: 2
    },
    {
        restName: 'Subway',
        restAddress: '753 Sandwich Ln',
        restImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6J_A_ZgtLJc8YKCNAGmV_Wnu_I_w82zfdmw&usqp=CAU',
        userId: 2
    }
]



await sequelize.sync({force: true}).then(async () => {
    await User.bulkCreate(users);
    await Winner.bulkCreate(winners);
})
await sequelize.close()