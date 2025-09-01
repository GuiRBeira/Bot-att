cd %USERPROFILE%\Desktop\Bot-att
set NODE_ENV=development
nodemon --ignore lock.json --ignore .git/* .\src\index.js
pause