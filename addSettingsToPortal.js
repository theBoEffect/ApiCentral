const fs = require('fs');
const bSettings = fs.existsSync('./settings.json');
const siteSettings = (bSettings) ? require('./settings.json') : require('./settings-default.json');

(async function(){
    if(bSettings === false) {
        fs.writeFileSync('./settings.json', JSON.stringify(siteSettings, null, 2));
    }
    if(fs.existsSync('./portal')){
        fs.writeFileSync('./portal/settings.json', JSON.stringify(siteSettings, null, 2));
    }
})();