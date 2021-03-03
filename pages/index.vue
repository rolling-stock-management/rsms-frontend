<template>
  <div>
    <div class="container container-custom">
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <h1>Система за управление на подвижен железопътен състав</h1>
          <h4>За по-добра железница...</h4>
          <br />
          <b-button variant="outline-primary" size="lg" disabled
            >Подаване на сигнал за нередност</b-button
          >
        </div>
        <div class="col-xs-12 col-md-6">
          <b-img
            src="~/assets/method-draw-image.svg"
            fluid
            alt="Responsive image"
          ></b-img>
        </div>
      </div>
    </div>
    <hr />
    <div class="container-fluid padding" id="whatOffersSection">
      <div class="row welcome text-center">
        <div class="col-12">
          <h1 class="display-4">Какво предлага проектът?</h1>
        </div>
        <hr />
        <div class="col-12">
          <p class="lead">Приложение, изградено с Laravel и Nuxt.js</p>
        </div>
      </div>
    </div>
    <div class="container-fluid padding">
      <div class="row text-center padding">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <img
            class="rounded-circle rounded-img"
            src="~/assets/passenger.jpg"
          />
          <h2>Пътнически вагони</h2>
          <p>
            Подробна информация за единиците подвижен състав за превоз на
            пътници, техните ремонти и състояние. Възможност за подаване на
            сигнали за нередност от пътниците.
          </p>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <img class="rounded-circle rounded-img" src="~/assets/loco.jpg" />
          <h2>Локомотиви</h2>
          <p>
            Тяговият подвижен състав – движещата сила. Детайлна инфомация за
            наличните локомотиви, техните ремонти и разпределението им по
            влаковете.
          </p>
        </div>
        <div class="col-sm-12 col-md-4">
          <img class="rounded-circle rounded-img" src="~/assets/freight.jpg" />
          <h2>Товарни вагони</h2>
          <p>
            Обстойни данни за товарните вагони, включващи техните товарителни
            характеристики, ремонти и заетостта по влакове.
          </p>
        </div>
      </div>
      <hr class="my-4" />
    </div>

    <!-- About -->
    <div class="container-fluid padding" id="about">
      <div class="row padding justify-content-lg-center">
        <div class="col-md-12 col-lg-6">
          <h2>Цели</h2>
          <p>
            Към момента система за проследяване на железопътният подвижен състав
            в страната не съществува. Това води до влошена комуникация между
            различните структури и служители в железницата, което от своя страна
            намалява контрола върху изпълнението на различните разпоредби и
            липса на цялостна представа за състоянието на вагонния парк. Тези
            фактори се отразяват и на пътниците като правят качеството на
            услугата по-лошо.
          </p>
          <p class="text-justify">
            Проектът разпределено интернет приложение „Система за управление на
            ПЖПС“ има за цел да предостави централизирана платформа за
            съхранение и управление на подвижния железопътен състав на дадена
            железопътна администрация. Дава се възможност за проследяване на
            положението на различните вагони и локомотиви из републиканската
            мрежа, тяхното състояние и техническо обслужване. Предоставя се
            възможност за подаване на сигнали за нередност от пътниците на даден
            влак. Уебсайтът предлага решение на споменатият проблем, като той
            бива полезен не само в професионален аспект, но и за самите
            пътуващи.
          </p>
        </div>
        <div class="col-md-12 col-lg-4">
          <img class="img-fluid" src="~/assets/undraw_server_status_5pbv.svg" />
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="footer mt-auto py-3">
      <div class="container text-center">
        <span class="">Stoyan Haydushki</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style>
.padding {
  padding-bottom: 2rem;
}
.welcome {
  margin: 0 auto;
  margin-top: 2rem;
  hr {
    border-top: 2px solid #b4b4b4;
    width: 75%;
    margin-top: 0.3rem;
    margin-bottom: 1rem;
  }
}
.rounded-img {
  max-width: 50%;
  max-height: 100%;
}

.footer {
  background-color: rgba(0, 0, 0, 0.35);
}

.container-custom {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
