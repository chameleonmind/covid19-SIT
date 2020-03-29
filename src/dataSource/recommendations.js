const recommendations = {
  sr: {
    measures: [
      {
        name: 'Pranje ruku',
        icon: require('./icons/icon_handwash.svg'),
        description: 'Perite ruke sapunom i vodom najmanje 20 sekundi'
      },
      {
        name: 'Gel za dezinfekciju',
        icon: require('./icons/icon_sanitizer.svg'),
        description: 'Van kuće koristite gelove za suvo pranje ruku ili alkohol sprej'
      },
      {
        name: 'Dodirivanje lica',
        icon: require('./icons/icon_face_touch.svg'),
        description: 'Ne dodirujte lice neopranim rukama (usta, oči, nos)'
      },
      {
        name: 'Kašalj',
        icon: require('./icons/icon_breath.svg'),
        description: 'Prilikom kijanja ili kašljanja koristite unutrašnju stranu lakta ili maramicu'
      },
      {
        name: 'Grljenje i rukovanje',
        icon: require('./icons/icon_crowd.svg'),
        description: 'Izbegavajte rukovanje, grljenje i ljubljenje prilikom pozdravljanja'
      },
      {
        name: 'Okupljanja',
        icon: require('./icons/icon_isolation.svg'),
        description: 'Izbegavajte okupljanja sa većim brojem ljudi u zatvorenom prostoru'
      },
      {
        name: 'Maska',
        icon: require('./icons/icon_mask.svg'),
        description: 'Maska mora da prianja na lice, da pokriva nos i usta'
      }
    ],
    info: 'Icons by https://www.iconfinder.com/iconpai'
  }
}
export default recommendations
