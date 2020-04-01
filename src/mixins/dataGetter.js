import { differenceInMinutes } from 'date-fns/esm'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('country', ['getSelectedCountry'])
  },
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
        throw new Error(this.$t('translations.common.dataUnavailable'))
      }
    },
    setInStorageWithTimestamp (key, data) {
      try {
        const now = new Date()
        const dataToSave = {
          timestamp: now.getTime(),
          country: this.getSelectedCountry,
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
            text: this.$t('translations.common.noNewData'),
            type: 'info',
            duration: 3000
          })
          resolve(storageSource.data)
        } else {
          this.axios(url)
            .then(response => {
              // console.log(response)
              if (response.status >= 200 && response.status < 400) {
                this.setInStorageWithTimestamp(key, response.data)

                resolve(response.data)

                this.$notification.show({
                  text: this.$t('translations.common.newDataFetched'),
                  type: 'success',
                  duration: 3000
                })
              } else {
                reject(new Error(this.$t('translations.common.dataUnavailable')))

                this.$notification.show({
                  text: this.$t('translations.common.dataError'),
                  type: 'error',
                  duration: 3000
                })
              }
            })
            .catch(e => {
              reject(new Error(this.$t('translations.common.dataUnavailable')))

              this.$notification.show({
                text: this.$t('translations.common.dataError'),
                type: 'danger',
                duration: 5000
              })
            })
        }
      })
    }
  }
}
