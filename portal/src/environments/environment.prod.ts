import * as siteSettings from '../../siteSettings.json';
const setting: any = siteSettings;
export const environment = {
  production: true,
  baseUrl: '/',
  swagger: '/swagger',
  reDoc: '/api',
  setting: setting.default
};
