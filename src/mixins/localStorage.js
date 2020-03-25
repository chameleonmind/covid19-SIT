const DATA_KEY = 'sitData'

export default {
  methods: {
    getDataFromLocalStorage () {
      return new Promise((resolve, reject) => {
        let localData = {}
        try {
          localData = localStorage.getItem(DATA_KEY) || {}
          resolve(JSON.parse(localData))
        } catch (e) {
          reject(new Error('Nije moguće pročitati podatke'))
        }
      })
    },
    saveDataToLocalStorage (payload) {
      return new Promise((resolve, reject) => {
        try {
          localStorage.setItem(DATA_KEY, JSON.stringify(payload))
          resolve()
        } catch (e) {
          reject(new Error('Nije moguće snimiti podatke'))
        }
      })
    }
  }
}
