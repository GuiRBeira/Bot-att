const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot do Guilherme online 🚀')
})

app.listen(3000, () => {
  console.log('Anti-sleep ligado na porta 3000')
})

// Importa e inicia o bot
const startBot = require('./bot/startBot') // ou './src/bot' se estiver em src
startBot()
