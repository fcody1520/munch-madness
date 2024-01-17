

export default {
    login: async (req,res) => {
        console.log('hit login');


        res.sendStatus(200)
    },
    register: async (req,res) => {
        console.log('hit register');
        res.sendStatus(200)
    }
}