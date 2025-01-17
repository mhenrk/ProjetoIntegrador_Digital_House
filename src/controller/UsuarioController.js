const db = require("../models")
const bcryptjs = require("bcryptjs")

module.exports = {
    async store(req, res) {
        const {
            nome,
            email,
            password
        } = req.body

        const passwordHash = bcryptjs.hashSync(password, 8)

        try {
            const cadUser = await db.Usuario.create({
                nome,
                email,
                password: passwordHash
            })
            return res.status(200).json({ nome, email, passwordHash })
        } catch (error) {
            return res.status(400).json("Ocorreu um erro: " + error.message)
        }
    },

    async index(req, res) {
        try {
            const usuarios = await db.Usuario.findAll({
                include: [
                    {
                        model: db.Foto,
                        as: 'foto',
                        attributes: {
                            exclude: ['usuario_id', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: db.Pet,
                        as: 'pet',
                        include: [
                            {
                                model: db.Tipo,
                                as: 'tipo',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Raca,
                                as: 'raca',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Peso,
                                as: 'peso',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Genero,
                                as: 'genero',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Castracao,
                                as: 'castracao',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            }
                        ],
                        attributes: {
                            exclude: ['raca_pet_id', 'tipo_pet_id', 'genero_pet_id', 'pet_castrado_id', 'peso_pet_id', 'usuario_id', 'createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: {
                    exclude: ['is_admin', 'cpf', 'password', 'cep', 'rua', 'numero', 'bairro', 'createdAt', 'updatedAt']
                }
            })
            return res.status(200).json(usuarios)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                errors: ['Usuários não encontrados']
            })
        }
    },

    async show(req, res) {
        try {
            const showUser = await db.Usuario.findByPk(req.params.id,{
                include: [
                    {
                        model: db.Pet,
                        as: 'pet',
                        include: [
                            {
                                model: db.Tipo,
                                as: 'tipo',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Raca,
                                as: 'raca',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Peso,
                                as: 'peso',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Genero,
                                as: 'genero',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            },
                            {
                                model: db.Castracao,
                                as: 'castracao',
                                attributes: {
                                    exclude: ['id', 'createdAt', 'updatedAt']
                                }
                            }
                        ],
                        attributes: {
                            exclude: ['raca_pet_id', 'tipo_pet_id', 'genero_pet_id', 'pet_castrado_id', 'peso_pet_id', 'usuario_id', 'createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: {
                    exclude: ['is_admin', 'password', 'createdAt', 'updatedAt']
                }
            }
            )

            return res.status(200).json(showUser)
        } catch (error) {
            return res.status(404).json("Ocorreu um erro: " + error.message)
        }
    },

    async update(req, res) {
        try {
            const userID = await db.Usuario.findByPk(req.id)

            if (!userID) {
                return res.status(400).json({
                    errors: ['Usuário não encontrado']
                })
            }
            console.log(req.body)

            const updatedUser = await userID.update(req.body)


            return res.json(updatedUser)
        } catch (error) {

            console.log(error.message)
            
            return res.status(404).json("Ocorreu um erro: " + error.message)
        }
    },

    async delete(req, res) {
        try {
            const userID = await db.Usuario.findByPk(req.id)

            if (!userID) {
                return res.status(400).json({
                    errors: ['Usuário não encontrado']
                })
            }

            await userID.destroy()

            return res.json(userID)
        } catch (error) {
            return res.status(404).json("Ocorreu um erro: " + error.message)
        }
    },

    async findUser(req, res) {

        try {

            const { email } = req.body

            if (!email) res.status(404).send({ message: 'campo obrigatorio' })

            const user = await db.Usuario.findOne({
                where: { email },
            })

            if (!user || user == null) {
                return res.status(404).send({
                    error: ["usuario nao encontrado"]
                })
            }

            const usuario = {
                id: user.id,
                nome: user.nome,
                email: user.email
            }

            return res.status(200).send({
                message: "usuario encontrado",
                usuario
            })

        } catch (error) {
            console.log(`Ocorreu um Erro: ${error}`)
        }


    }
}



