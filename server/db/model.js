import { DataTypes, Model } from 'sequelize';
import util from 'util'
import connectToDB from './db.js';

const sequelize = await connectToDB('postgres:///munch_madness')

class User extends Model {
    [util.inspect.custom](){
        return this.toJSON()
    }
}

console.log(sequelize)

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'user',
        sequelize: sequelize
    }
)

class Winner extends Model{
    [util.inspect.custom](){
        return this.toJSON()
    }
}

Winner.init(
    {
        winnerId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        restName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restImg: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'winner',
        sequelize: sequelize,
        timestamps: true
    }
)

User.hasMany(Winner, {foreignKey: 'userId'})
Winner.belongsTo(User, {foreignKey: 'userId'})




export {sequelize,User, Winner}