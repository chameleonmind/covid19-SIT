<template>
  <div class="about">
    <h2>Upotreba aplikacije</h2>
    <p>
      Usled brzog širenja korona virusa, suočeni smo sa obavezom da se na neko vreme distanciramo od drugih ljudi.
    </p>
    <p>
      Poenta ove aplikacije je praćenje vremena koje provodimo u samoizolaciji i praćenje najnovijih uputstava
      stručnjaka i vesti koje nam dolaze u vezi sa Covid-19 virusom.
    </p>
    <p>
      Čuvajte sebe i bliske ljude, pratite preporuke i izdržite ovaj period koji je stresan za sve nas.
    </p>
    <hr>
    <h2>Izvori informacija</h2>
    <p>
      Sve informacije u ovoj aplikaciji su informativnog karaktera i prenesene su iz zvaničnih izvora ili sa sajtova
      koji prenose vesti.
    </p>
    <ul>
      <li>
        <a href="https://covid19.rs/" target="_blank">Zvanični sajt Vlade Republike Srbije posvećen COVID-19 virusu</a>
      </li>
      <li>
        <a href="https://github.com/novelcovid/api" target="_blank">API for Current cases and more stuff about COVID-19
          or the Novel Coronavirus Strain</a>
      </li>
      <li>
        <a href="https://www.snopes.com/" target="_blank">Snopes.com</a>
      </li>
      <li>
        <a href="http://rs.n1info.com/" target="_blank">N1 Portal</a>
      </li>
    </ul>
    <hr>
    <h2>Želite da doprinesete razvoju aplikacije?</h2>
    <p>
      Posetite GitHub stranicu projekta gde možete ostaviti predloge ili eventualne ispravke koda: <a
      href="https://github.com/chameleonmind/covid19-SIT" target="_blank">Covid 19 SIT na GitHub</a>
    </p>
    <p>Pošaljite mejl sa predlozima i sugestijama na <a href="mailto:covid19sit@gmail.com" target="_blank">covid19sit@gmail.com</a></p>
    <hr>
    <h2>O autoru</h2>
    Miloš Milošević
    <ul>
      <li><a href="https://github.com/chameleonmind/" target="_blank">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/milosevicm/" target="_blank">LinkedIn</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
  .about {
    padding: 1rem;
    width: 100%;
    max-width: 720px;
  }
</style>
