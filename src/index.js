const fs = require('fs');
const { execSync } = require('child_process');
const si = require('systeminformation');
const { machineIdSync } = require('node-machine-id');

async function getOrigem() {
  const id = machineIdSync(true);
  const osInfo = await si.osInfo();
  const cpu = await si.cpu();
  return `${osInfo.platform}-${osInfo.arch}-${cpu.manufacturer}-${id.slice(0, 6)}`;
}

let lock; // usado também na função liberar()

async function main() {
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

    // 3. Define a origem e ativa o lock
    lock.ativo = true;
    lock.origem = await getOrigem();
    fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

    // 4. Verifica mudanças antes de commitar
    execSync('git add .');
    const status = execSync('git status --porcelain').toString().trim();
    if (status) {
      execSync(`git commit -m "Bot iniciado no ${lock.origem || 'desconhecido'}"`);
      execSync('git push', { stdio: 'inherit' });
    } else {
      console.log('✅ Nenhuma mudança a commitar.');
    }

    // 5. Captura sinais para encerrar corretamente
    process.on('SIGINT', () => liberar(true));
    process.on('SIGTERM', () => liberar(true));
    process.on('SIGHUP', () => liberar(true));
    process.on('uncaughtException', (err) => {
      console.error('💥 Erro não tratado:', err);
      liberar(true);
    });
    process.on('exit', () => liberar(false));

    // 6. Inicia o bot
    const startBot = require('./bot/startBot');
    startBot();

  } catch (err) {
    console.error('❗ Erro ao preparar o bot:', err.message);
    process.exit(1);
  }
}

// Função para liberar o lock ao encerrar
function liberar(ehFinalForcado = false) {
  if (!lock || !lock.ativo) return;

  console.log('\n🛑 Encerrando e liberando lock...');
  lock.ativo = false;
  fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

  try {
    execSync('git add .');
    const status = execSync('git status --porcelain').toString().trim();
    if (status) {
      execSync(`git commit -m "Bot encerrado no ${lock.origem || 'desconhecido'}"`);
      execSync('git push', { stdio: 'inherit' });
    } else {
      console.log('🔒 Lock liberado sem mudanças.');
    }
  } catch (err) {
    console.error('⚠️ Erro ao liberar lock:', err.message);
  }

  if (ehFinalForcado) process.exit(0);
}

main();