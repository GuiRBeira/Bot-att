const fs = require('fs');
const { execSync } = require('child_process');

// === VERIFICA LOCK AO INICIAR ===
try {
  execSync('git pull', { stdio: 'inherit' });

  const lock = JSON.parse(fs.readFileSync('lock.json', 'utf-8'));

  if (lock.ativo) {
    console.log(`❌ Bot já está ativo no dispositivo: ${lock.origem}`);
    process.exit();
  }

  lock.ativo = true;
  lock.origem = 'celular'; // ou 'pc' dependendo de onde rodar
  fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

  execSync('git add .');
  execSync('git commit -m "Bot iniciado no celular"');
  execSync('git push', { stdio: 'inherit' });

  // Prepara a liberação do lock ao encerrar
  process.on('SIGINT', () => liberar(lock));
  process.on('SIGTERM', () => liberar(lock));

} catch (err) {
  console.error('Erro ao configurar o controle de sessão:', err.message);
  process.exit();
}

// === INICIA O BOT ===
const startBot = require('./bot/startBot'); // ajuste conforme sua estrutura
startBot();


// === FUNÇÃO PARA LIBERAR LOCK AO ENCERRAR ===
function liberar(lock) {
  console.log('\n🛑 Encerrando bot e liberando lock...');
  lock.ativo = false;
  fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));
  try {
    execSync('git add lock.json');
    execSync('git commit -m "Bot encerrado no celular"');
    execSync('git push', { stdio: 'inherit' });
  } catch (e) {
    console.error('Erro ao liberar o lock:', e.message);
  }
  process.exit();
}
