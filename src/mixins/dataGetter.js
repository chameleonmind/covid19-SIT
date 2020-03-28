import { differenceInMinutes } from 'date-fns'

export default {
  methods: {
    getFromStorageWithTimestamp (key) {
      try {
        const data = localStorage.getItem(key)
        if (data) {
          return JSON.parse(data)
        } else {
          return {}
        }
      } catch (e) {
        throw new Error('Cannot fetch data from localstorage')
      }
    },
    setInStorageWithTimestamp (key, data) {
      try {
        const now = new Date()
        const dataToSave = {
          timestamp: now.getTime(),
          data: data
        }
        // console.log(key, JSON.stringify(dataToSave))
        localStorage.setItem(key, JSON.stringify(dataToSave))
      } catch (e) {
        // console.log(e)
      }
    },
    async getData (key, url, timeValid = 360) {
      const storageSource = await this.getFromStorageWithTimestamp(key)
      const now = new Date()
      return new Promise((resolve, reject) => {
        if (timeValid !== 0 && Object.keys(storageSource).length && differenceInMinutes(now.getTime(), storageSource.timestamp) < timeValid) {
          this.$notification.show({
            text: 'Nema novih podataka',
            type: 'info',
            duration: 3000
          })
          resolve(storageSource.data)
        } else {
          this.$http(url)
            .then(response => {
              if (response.status >= 200 && response.status < 400) {
                this.setInStorageWithTimestamp(key, response.data)

                resolve(response.data)

                this.$notification.show({
                  text: 'Preuzeti su najnoviji podaci',
                  type: 'success',
                  duration: 3000
                })
              } else {
                reject(new Error('Podaci nisu dostupni'))

                this.$notification.show({
                  text: 'Došlo je do greške prilikom preuzimanja podataka',
                  type: 'error',
                  duration: 3000
                })
              }
            })
        }
      })
    }
  }
}
