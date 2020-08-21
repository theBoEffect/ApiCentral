import * as siteSettings from '../../settings.json';
const setting: any = siteSettings;
export const environment = {
  production: true,
  protocol: 'http',
  service: 'http://localhost:3000',
  setting: setting.default
};
