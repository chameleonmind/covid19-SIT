import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store/index'

Vue.use(VueI18n)

const messages = {
  sr: {
    translations: {
      menu: {
        homePage: 'Početna',
        aboutPage: 'O aplikaciji',
        settingsPage: 'Podešavanja',
        collapseSidebar: 'Skupi',
        expandSidebar: 'Proširi'
      },
      home: {
        daysProgress: {
          hello: 'Zdravo',
          start: 'Početak:',
          end: 'Kraj:',
          elapsedTime: 'Proteklo:',
          remainingTime: 'Preostalo',
          days: 'dana',
          day: 'dan'
        },
        usefulInfo: {
          title: 'Korisne informacije'
        },
        stats: {
          title: 'Statistika',
          lastChangeDate: 'Poslednja promena:',
          latestData: 'Poslednji podaci',
          confirmedCases: 'Potvrđeni',
          deathCases: 'Smrtni',
          recoveredCases: 'Izlečeni',
          lineGraph: 'Linijski grafik',
          barChart: 'Grafik sa stubićima',
          '60days': '60 dana',
          '30days': '30 dana',
          '14days': '14 dana',
          '7days': '7 dana'
        },
        measures: {
          title: 'Preventivne mere zaštite od koronavirusa'
        }
      },
      settings: {
        appSettings: 'Podešavanja aplikacije',
        changeDataTitle: 'Promeni podatke',
        deleteData: {
          title: 'Obriši sve podatke',
          subtitle: 'Obriši sve sačuvane podatke',
          deleteButton: 'Obriši'
        },
        deleteConfirmation: {
          title: 'Potvrda',
          description: 'Da li ste sigurni da želite da obrišete sve sačuvane podatke?'
        },
        deleteSuccess: 'Podaci uspešno izbrisani',
        saveSuccess: 'Podaci uspešno sačuvani'
      },
      personalInfo: {
        title: 'Podešavanja',
        name: 'Ime',
        isolationStart: 'Početak izolacije',
        startPickerDescription: 'Odaberi datum početka izolacije',
        isolationEnd: 'Kraj izolacije',
        endPickerDescription: 'Odaberi datum kraja izolacije',
        '14days': '14 dana',
        '28days': '28 dana',
        customEndDate: 'Odabraću iz kalendara',
        info: 'Podaci koje ovde unosite se čuvaju samo na ovom uređaju i ne šalju se ni na jedan servis.',
        error: 'Morate popuniti sve podatke',
        languagePlaceholder: 'Odaberite jezik',
        startDateError: 'Početni datum nije izabran'
      },
      common: {
        source: 'Izvor',
        icons: 'Ikone',
        save: 'Sačuvaj',
        cancel: 'Otkaži',
        delete: 'Obriši',
        noNewData: 'Nema novih podataka',
        dataUnavailable: 'Nije moguće preuzeti podatke',
        newDataFetched: 'Preuzeti su najnoviji podaci',
        dataError: 'Došlo je do greške prilikom preuzimanja podataka'
      }
    }
  },
  en: {
    translations: {
      menu: {
        homePage: 'Home',
        aboutPage: 'About',
        settingsPage: 'Settings',
        collapseSidebar: 'Collapse sidebar',
        expandSidebar: 'Expand sidebar'
      },
      home: {
        daysProgress: {
          hello: 'Hello',
          start: 'Start:',
          end: 'End:',
          elapsedTime: 'Elapsed:',
          remainingTime: 'Remaining:',
          days: 'days'
        },
        usefulInfo: {
          title: 'Useful information'
        },
        stats: {
          title: 'Statistics',
          lastChangeDate: 'Last change:',
          latestData: 'Latest data',
          confirmedCases: 'Confirmed',
          deathCases: 'Deaths',
          recoveredCases: 'Recovered',
          lineGraph: 'Line chart',
          barChart: 'Bar graph',
          '60days': '60 days',
          '30days': '30 days',
          '14days': '14 days',
          '7days': '7 days'
        },
        measures: {
          title: 'Basic protective measures against COVID-19'
        }
      },
      settings: {
        appSettings: 'App settings',
        changeDataTitle: 'Change your data',
        deleteData: {
          title: 'Clear data',
          subtitle: 'Delete all saved data',
          deleteButton: 'Delete'
        },
        deleteConfirmation: {
          title: 'Confirmation',
          description: 'Are you sure you want to delete all saved data?'
        },
        deleteSuccess: 'Data successfully removed',
        saveSuccess: 'Data saved successfully'
      },
      personalInfo: {
        title: 'Personal info settings',
        name: 'First name',
        isolationStart: 'Isolation start',
        startPickerDescription: 'Pick a date when your isolation began',
        isolationEnd: 'Isolation end',
        endPickerDescription: 'Pick a date when your isolation should end',
        '14days': '14 days',
        '28days': '28 days',
        customEndDate: 'Pick from calendar',
        info: 'The data you enter here will be save on this device only and will not be sent to any service.',
        error: 'You must fill all fields',
        languagePlaceholder: 'Select your language',
        startDateError: 'Start date isn\'t selected'
      },
      common: {
        source: 'Source',
        icons: 'Icons',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        noNewData: 'No new data available',
        dataUnavailable: 'Data unavailable',
        newDataFetched: 'New data fetched',
        dataError: 'There has been an error trying to get data'
      }
    }
  }
}

const i18n = new VueI18n({
  locale: store.getters['language/getAppLanguage'] || 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
