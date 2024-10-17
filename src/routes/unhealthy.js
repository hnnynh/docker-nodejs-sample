const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const currentTime = new Date().toISOString();

    const logFilePath = path.join(__dirname, '../unhealthy-probe.log');

    fs.appendFile(logFilePath, `${currentTime}\n`, (err) => {
        if (err) {
            console.error('로그 파일에 기록하는 중 오류 발생:', err);
        }
    });

    res.status(400).send('Bad');
};
