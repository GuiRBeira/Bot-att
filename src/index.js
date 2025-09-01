// startBotWrapper.js
const fs = require('fs');
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const si = require('systeminformation');
require('dotenv').config();

const devMode = process.env.NODE_ENV === 'development';
const DEBOUNCE = 10000; // tempo mínimo entre commits
let lastCommit = 0;

// --- Funções auxiliares ---
function gerarIdPersistente() {
  const idPath = path.join(os.homedir(), '.machine-id');
  if (fs.existsSync(idPath)) return fs.readFileSync(idPath, 'utf-8');

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
  if (devMode) return; // ignora commits no desenvolvimento
  const now = Date.now();
  if (now - lastCommit < DEBOUNCE) return;
  lastCommit = now;

  try {
    const changes = execSync('git status --porcelain').toString().trim();
    if (changes) {
      execSync('git add .');
      execSync(`git commit -m "${message}"`);
      execSync('git push', { stdio: 'inherit' });
      console.log(`✅ Commit feito: ${message}`);
    }
  } catch (err) {
    console.error('⚠️ Erro ao tentar commitar:', err.message);
  }
}

// --- Função para liberar lock ---
async function liberar(lock, ehFinalForcado = false) {
  if (!lock || !lock.ativo) return;
  console.log('\n🛑 Encerrando e liberando lock...');
  lock.ativo = false;
  fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));
  gitCommitIfChanges(`Bot encerrado no ${lock.origem}`);
  if (ehFinalForcado) process.exit(0);
}

// --- Inicialização do Bot ---
(async () => {
  let lock;
  try {
    console.log('🔄 Executando git pull...');
    if (!devMode) execSync('git pull', { stdio: 'inherit' });

    lock = fs.existsSync('lock.json')
      ? JSON.parse(fs.readFileSync('lock.json', 'utf-8'))
      : { ativo: false, origem: '' };

    if (lock.ativo && !devMode) {
      console.log(`❌ Bot já está ativo no dispositivo: ${lock.origem}`);
      return; // evita reinício infinito com nodemon
    }

    lock.ativo = true;
    lock.origem = await getOrigem();
    fs.writeFileSync('lock.json', JSON.stringify(lock, null, 2));
    gitCommitIfChanges(`Bot iniciado no ${lock.origem}`);

    // Eventos de encerramento
    const cleanup = () => liberar(lock, true);
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGHUP', cleanup);
    process.on('uncaughtException', (err) => {
      console.error('Erro não tratado:', err);
      cleanup();
    });
    process.on('exit', () => liberar(lock, false));

    // --- Start do bot ---
    const startBot = require('./bot/startBot');
    startBot();

  } catch (err) {
    console.error('❗ Erro ao preparar o bot:', err.message);
    process.exit(1);
  }
})();
