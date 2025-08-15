const fs = require('fs');
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const si = require('systeminformation');

function gerarIdPersistente() {
  const idPath = path.join(os.homedir(), '.machine-id');

  if (fs.existsSync(idPath)) {
    return fs.readFileSync(idPath, 'utf-8');
  }

  const info = os.platform() + os.arch() + os.hostname() + Date.now();
  const id = crypto.createHash('sha256').update(info).digest('hex');
  fs.writeFileSync(idPath, id);
  return id;
}

async function getOrigem() {
  const id = gerarIdPersistente();
  const osInfo = await si.osInfo();
  const cpu = await si.cpu();
  return `${osInfo.platform}-${osInfo.arch}-${cpu.manufacturer}-${id.slice(0, 6)}`;
}

function gitCommitIfChanges(message) {
  try {
    const changes = execSync('git status --porcelain').toString().trim();
    if (changes) {
      execSync('git add .');
      execSync(`git commit -m "${message}"`);
      execSync('git push', { stdio: 'inherit' });
      console.log(`✅ Commit feito: ${message}`);
    } else {
      console.log('📂 Nenhuma modificação para commit.');
    }
  } catch (err) {
    console.error('⚠️ Erro ao tentar commitar:', err.message);
  }
}

(async () => {
  let lock;

  try {
    console.log('🔄 Executando git pull...');
    execSync('git pull', { stdio: 'inherit' });

    lock = JSON.parse(fs.readFileSync('lock.json', 'utf-8'));

    if (lock.ativo) {
      console.log(`❌ Bot já está ativo no dispositivo: ${lock.origem}`);
      //process.exit(); // Se quiser impedir mais de uma instância, descomente
    }

    lock.ativo = true;
    lock.origem = await getOrigem();
    fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

    gitCommitIfChanges(`Bot iniciado no ${lock.origem}`);

    process.on('SIGINT', () => liberar(true));
    process.on('SIGTERM', () => liberar(true));
    process.on('SIGHUP', () => liberar(true));
    process.on('uncaughtException', (err) => {
      console.error('Erro não tratado:', err);
      liberar(true);
    });
    process.on('exit', () => liberar(false));

    const startBot = require('./bot/startBot');
    startBot();

  } catch (err) {
    console.error('❗ Erro ao preparar o bot:', err.message);
    process.exit(1);
  }

  function liberar(ehFinalForcado = false) {
    if (!lock || !lock.ativo) return;

    console.log('\n🛑 Encerrando e liberando lock...');
    lock.ativo = false;
    fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));

    gitCommitIfChanges(`Bot encerrado no ${lock.origem}`);

    if (ehFinalForcado) process.exit(0);
  }
})();
