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
        expandSidebar: 'Proširi',
        statistics: 'Statistika'
      },
      home: {
        daysProgress: {
          hello: 'Zdravo',
          start: 'Početak:',
          end: 'Kraj:',
          elapsedTime: 'Proteklo:',
          remainingTime: 'Preostalo',
          days: 'dana',
          day: 'dan',
          daysMore: 'dana više',
          dayMore: 'dan više',
          lastDay: 'Poslednji dan',
          still: 'Još ',
          shareProgress: 'Podeli napredak:'
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
          '7days': '7 dana',
          refresh: 'Osveži'
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
        saveSuccess: 'Podaci uspešno sačuvani',
        selectLanguage: 'Odaberite jezik',
        chooseCountry: 'Odaberite zemlju'
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
        info: 'Svrha ove aplikacije je praćenje vremena koje provodimo u samoizolaciji i praćenje najnovijih uputstava ' +
          'stručnjaka i vesti koje nam dolaze u vezi sa Covid-19 virusom. Podaci koje ovde unosite se čuvaju samo na ovom uređaju i ne šalju se ni na jedan servis i služe isključivo Vama za praćenje vremena u izolaciji.',
        error: 'Morate popuniti sve podatke',
        languagePlaceholder: 'Odaberite jezik',
        startDateError: 'Početni datum nije izabran',
        countryPlaceholder: 'Odaberite zemlju'
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
        dataError: 'Došlo je do greške prilikom preuzimanja podataka',
        noData: 'Nema podataka za odabranu zemlju',
        share: 'Podeli',
        loadingInProgress: 'Učitavanje u toku...'
      },
      views: {
        dashboardView: 'Dashboard prikaz',
        classicView: 'Klasični prikaz'
      },
      share: {
        shareToTwitter: 'Share to Twitter',
        twitterText: 'Pratite koliko dugo ste u izolaciji i ostanite u toku sa vestima i događajima u vezi sa virusom Covid-19',
        twitterShareProgress1: 'U samoizolaciji sam već ',
        twitterShareProgress2: ' dana. Još ',
        twitterShareProgress3: ' dana do kraja! Pratim preostale dane na '
      },
      stats: {
        numbersTitle: 'Podaci u brojevima',
        date: 'Datum',
        confirmedCases: 'Potvđeni slučajevi',
        deathCases: 'Smrtni slučajevi',
        recoveredCases: 'Izlečeni',
        percentage: 'Procenat smrtnosti'
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
        expandSidebar: 'Expand sidebar',
        statistics: 'Statistics'
      },
      home: {
        daysProgress: {
          hello: 'Hello',
          start: 'Start:',
          end: 'End:',
          elapsedTime: 'Elapsed:',
          remainingTime: 'Remaining:',
          days: 'days',
          day: 'day',
          daysMore: 'days more',
          dayMore: 'day more',
          lastDay: 'Last day',
          still: '',
          shareProgress: 'Share progress:'
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
          '7days': '7 days',
          refresh: 'Refresh'
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
        saveSuccess: 'Data saved successfully',
        selectLanguage: 'Select language',
        chooseCountry: 'Choose country'
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
        info: 'The intended use of this app is to track time that we spend in self-isolation and to follow the newest instructions coming from the experts as well as news that are coming out in relation to this virus. ' +
          'The data you enter here will be saved on this device only, will not be sent to any service and will be used only for you to track your days in isolation.',
        error: 'You must fill all fields',
        languagePlaceholder: 'Select your language',
        startDateError: 'Start date isn\'t selected',
        countryPlaceholder: 'Select a country'
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
        dataError: 'There has been an error trying to get data',
        noData: 'There is no data for chosen country',
        share: 'Share',
        loadingInProgress: 'Loading...'
      },
      views: {
        dashboardView: 'Dashboard view',
        classicView: 'Classic view'
      },
      share: {
        shareToTwitter: 'Share to Twitter',
        twitterText: 'Keep track of how long you have been in isolation and stay informed about the news and events concerned with Covid-19',
        twitterShareProgress1: 'I have been ',
        twitterShareProgress2: ' days in self-isolation so far. ',
        twitterShareProgress3: ' more days to go! Following my progress on '
      },
      stats: {
        numbersTitle: 'Data in numbers',
        date: 'Date',
        confirmedCases: 'Confirmed cases',
        deathCases: 'Death cases',
        recoveredCases: 'Recovered',
        percentage: 'Mortality rate'
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
