import Sequelize, {DataTypes, Model} from 'sequelize';
// import util from 'util'

const sequelize = new Sequelize('postgresql:///munch_madness')

class User extends Model {
    // [util.inspect.custom](){
    //     return this.toJSON()
    // }
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
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
        sequelize: sequelize,
        timestamps: false
    }
)

await sequelize.sync({force: true})
await sequelize.close()