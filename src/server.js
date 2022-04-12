const express = require('express')
const app = express()
const cors = require('cors')

const castracaoRoutes = require('../src/routes/castracaoRoutes')
const pesoPetRoutes = require('../src/routes/pesoPetRoutes')
const racaPetRoutes = require('../src/routes/racaPetRoutes')
const tipoPetRoutes = require('../src/routes/tipoPetRoutes')
const generoPetRoutes = require('../src/routes/generoPetRoutes')
const cadastraPetRoutes = require('./routes/PetRoutes')
const cadastraUserRoutes = require('./routes/UserRoutes')
const tokenRoutes = require('../src/routes/tokenRoutes')
const fotoRoutes = require('../src/routes/fotoRoutes')
const servicosRoutes = require('../src/routes/servicosRoutes')

// //chamando o arquivo index da base de dados

//Chamando arquivo de configuração global
require('dotenv').config()

//rotas da aplicação - remover se estiver tudo ok
app.use(express.json())

//tratamento de requisições de formulários - body
//realiza o tratamento de requisições passadas pelo body
//isso evita que o body recebido por formulário venha undefined
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: `${process.env.FRONT_URL}`
}))

//app.use('/', homeRoutes)
app.use('/petshop/castracao-pet/', castracaoRoutes)
app.use('/petshop/raca-pet/', racaPetRoutes)
app.use('/petshop/tipo-pet/', tipoPetRoutes)
app.use('/petshop/genero-pet/', generoPetRoutes)
app.use('/petshop/peso-pet/', pesoPetRoutes)
app.use('/petshop/cadastra-pet/', cadastraPetRoutes)
app.use('/petshop/cadastra-user/', cadastraUserRoutes)
app.use('/petshop/token/', tokenRoutes)
app.use('/petshop/foto/', fotoRoutes)
app.use('/petshop/servicos/', servicosRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server Backend: http://localhost:${process.env.PORT}`)
})
