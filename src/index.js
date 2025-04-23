const fs = require('fs');
const { execSync } = require('child_process');

let lock;

try {
  // 1. Atualiza repositório local
  console.log('🔄 Executando git pull...');
  execSync('git pull', { stdio: 'inherit' });

  // 2. Lê o lock.json
  lock = JSON.parse(fs.readFileSync('lock.json', 'utf-8'));

  if (lock.ativo) {
    console.log(`❌ Bot já está ativo no dispositivo: ${lock.origem}`);
    process.exit();
  }

  // 3. Atualiza lock para indicar que está rodando
  lock.ativo = true;
  lock.origem = 'pc'; // ou 'pc'
  fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

  // 4. Commita e envia todas as mudanças
  execSync('git add .');
  execSync('git commit -m "Bot iniciado no pc"');
  execSync('git push', { stdio: 'inherit' });

  // 5. Prepara para liberar o lock ao sair
  process.on('SIGINT', () => liberar());
  process.on('SIGTERM', () => liberar());
  process.on('SIGHUP', () => liberar());
  process.on('exit', () => liberar());
  process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
    liberar();
  });

} catch (err) {
  console.error('❗ Erro ao preparar o bot:', err.message);
  process.exit(1);
}

// === INICIA O BOT ===
const startBot = require('./bot/startBot');
startBot();


// === FUNÇÃO DE ENCERRAMENTO ===
function liberar() {
  if (!lock || !lock.ativo) return;

  console.log('\n🛑 Encerrando e liberando lock...');
  lock.ativo = false;
  fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

  try {
    execSync('git add .');
    execSync('git commit -m "Bot encerrado no celular"');
    execSync('git push', { stdio: 'inherit' });
  } catch (err) {
    console.error('⚠️ Erro ao liberar lock:', err.message);
  }
}
