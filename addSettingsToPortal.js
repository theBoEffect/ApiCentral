const fs = require('fs');
const siteSettings = require('./settings');

(async function(){
    if(fs.existsSync('./portal')){
        fs.writeFileSync('./portal/siteSettings.json', JSON.stringify(siteSettings, null, 2));
    }
})();