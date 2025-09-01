#!/bin/bash
# Caminho para a pasta do bot
cd "$HOME/Bot-att"

# Define o ambiente (development ou production)
export NODE_ENV=production   # troque para "production" no servidor

# Inicia o bot com nodemon
nodemon --ignore lock.json --ignore .git/* ./src/index.js
