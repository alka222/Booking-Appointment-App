const User = require('../models/user');
const sequelize = require('../util/database');

exports.postAddUser = async (req, res, next) => {
console.log(req.body)
    try{
        let name = req.body.name;
        let email = req.body.email;
        let number = req.body.number;

        if(!number){
            throw new error('Please Enter Phone Number');
        }

        const data = await User.create({
            name: name,
            email: email,
            number: number
        })

        res.status(201).json({userDetails: data});
    }

    catch {
        console.log(error);
        res.status(201).json({error: error});
    }
}

exports.getAllUsers = async (req, res, next) => {
    
    try{
        const data = await User.findAll();
        res.status(201).json(data);
    }

    catch{
        console.log(error);
        res.status(500).json({error:error});
    }

}

exports.deleteUser = async (req, res, next) => {
    console.log(req.params.userId)
    try {
            const userId = req.params.userId;
            if(!userId){
                return res.status(400).json({error: 'id is missing'});
            }
            await User.destroy({where : {id: userId}});
            res.sendStatus(200);
    }

    catch {
            console.log(error);
            res.status(500).json({error:'error occured'});

    }

}