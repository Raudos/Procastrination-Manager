import i18n from 'i18next';

import GB from 'src/locales/GB';
import PL from 'src/locales/PL';

 i18n
  .init({
    fallbackLng: 'GB',
    resources: {
      GB: {
        translation: GB
      },
      PL: {
        translation: PL
      }
    },
    debug: false,
    react: {
      wait: true
    }
  });

export default i18n;
