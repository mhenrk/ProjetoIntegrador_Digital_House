const { Model, DataTypes } = require('sequelize')

class Tb_racapet extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING(9)
        },
        {sequelize})//conexao com o banco de dados
    }
}

module.exports = Tb_racapet