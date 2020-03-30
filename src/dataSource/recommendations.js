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
    ]
  },
  en: {
    measures: [
      {
        name: 'Wash hands regularly',
        icon: require('./icons/icon_handwash.svg'),
        description: 'Wash your hands with warm water and soap for at least 20 seconds'
      },
      {
        name: 'Disinfection gel',
        icon: require('./icons/icon_sanitizer.svg'),
        description: 'Use disinfection gel when you are outside of your house'
      },
      {
        name: 'Avoid touching face',
        icon: require('./icons/icon_face_touch.svg'),
        description: 'Try not to touch your face (mouth, eyes and nose) with unwashed hands'
      },
      {
        name: 'Coughing',
        icon: require('./icons/icon_breath.svg'),
        description: 'If you are sneezing or coughing cover your face with inside of the elbow or with handkerchief'
      },
      {
        name: 'Hugs and shaking hands',
        icon: require('./icons/icon_crowd.svg'),
        description: 'Avoid hugging and shaking hands with other people'
      },
      {
        name: 'Gatherings',
        icon: require('./icons/icon_isolation.svg'),
        description: 'Avoid gatherings with people in closed spaces'
      },
      {
        name: 'Wear a mask',
        icon: require('./icons/icon_mask.svg'),
        description: 'Mask should adhere to the face, completely covering the nose and mouth'
      }
    ]
  }
}
export default recommendations
