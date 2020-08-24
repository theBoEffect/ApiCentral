const fs = require('fs');
const settingsFile = './settings.json';
const indexTemplate = './src/index.template.html';
const bSettings = fs.existsSync(settingsFile);
const bIndexTemplate = fs.existsSync(indexTemplate);
const siteSettings = (bSettings) ? require(settingsFile) : require('./settings-default.json');

(async function(){
  try {
    if(bSettings === false) {
      console.info('Creating a Settings File from Default');
      fs.writeFileSync(settingsFile, JSON.stringify(siteSettings, null, 2));
    }
    if(bIndexTemplate === true) {
      let content = await fs.readFileSync(indexTemplate, 'utf8');
      let updated;
      updated = content
        .replace(/{{TITLE}}/g, siteSettings.title)
        .replace(/{{SITE_NAME}}/g, siteSettings.bannerTitle)
        .replace(/{{URL}}/g, `${siteSettings.protocol}://${siteSettings.service}`)
        .replace(/{{DESCRIPTION}}/g, siteSettings.bannerStatement)
        .replace(/{{IMAGE}}/g, siteSettings.siteImage);

      fs.writeFileSync('./src/index.html', updated);
    }
  } catch (error) {
    console.error(error);
  }
})();
