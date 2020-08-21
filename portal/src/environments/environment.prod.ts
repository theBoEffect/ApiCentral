import * as siteSettings from '../../settings.json';
const setting: any = siteSettings;
export const environment = {
  production: true,
  protocol: setting.protocol,
  service: setting.service,
  setting: setting.default
};
