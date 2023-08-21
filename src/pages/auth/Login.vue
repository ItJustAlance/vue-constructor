<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import store from "@/store";

const router = useRouter();

const login = ref("");
const password = ref("");
const remember = ref(false);
const errors = ref([]);

const loginUser = async () => {
  try {
    await store
      .dispatch("auth/login", {
        login: login.value,
        password: password.value,
        remember: remember.value
      })
      .then(
        response => {
          if (response.data?.errors) {
            errors.value = response.data?.errors?.map(error => error.message);
          }
        },
        error => {
          console.error(
            "Got nothing from server. Prompt user to check internet connection and try again",
            error
          );
        }
      );
    await router.push("/programs").catch(() => {});
    return true;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="auth-page">
    <main class="auth-content auth-page__content">
      <div class="auth-content__inner">
        <div class="auth-content__col auth-content__col_for_cover">
          <img
            src="@/assets/img/man-and-board.svg"
            alt="Человек у доски"
            class="auth-content__cover"
          />
        </div>
        <div class="auth-content__col auth-content__col_for_form">
          <div class="auth">
            <img src="@/assets/img/logo.png" alt="логотип" class="auth__logo" />
            <h1 class="auth__title">Конструктор программ&nbsp;ДПО</h1>

            <form @submit.prevent="loginUser" class="form auth__form">
              <div class="form__row">
                <label for="login" class="form__label">Имя пользователя</label>
                <input
                  id="login"
                  type="text"
                  class="input input_theme_public input_width_full"
                  placeholder="Введите имя пользователя"
                  v-model="login"
                />
                <span class="error form__error-msg"></span>
              </div>
              <div class="form__row">
                <label for="password" class="form__label"
                  >Пароль cZ9mQcrBsPK7P</label
                >
                <input
                  id="password"
                  type="password"
                  class="input input_theme_public input_width_full"
                  placeholder="Введите пароль"
                  v-model="password"
                  :toggleMask="true"
                />
                <span class="error form__error-msg"></span>
              </div>
              <div class="form__row">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    v-model="remember"
                    class="checkbox__input"
                  />
                  <span class="checkbox__pseudo"></span>
                  <span class="checkbox__text">Запомнить пароль</span>
                </label>
              </div>
              <div v-if="errors.length > 0" class="form__row">
                <div
                  class="text-error"
                  v-for="(error, index) in errors"
                  :key="index"
                >
                  1 {{ error }}
                </div>
              </div>
              <div class="form__buttons">
                <button
                  type="submit"
                  class="button button_theme_main button_width_full"
                >
                  Вход
                </button>
                <button class="button button_theme_outline button_width_full">
                  Вход через ДПО
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer-public auth-page__footer">
      <div class="footer-public__inner">
        <div class="footer-public__col footer-public__col_name_left">
          <a href="#" class="button button_theme_outline"
            >Техническая поддержка</a
          >
        </div>
        <div class="footer-public__col footer-public__col_name_center">
          <a
            href="https://www.dpomos.ru/"
            class="button button_theme_text"
            target="_blank"
            >dpomos.ru</a
          >
          <p class="footer-public__copy">
            © 2023 Департамент образования и науки города Москвы
          </p>
        </div>
        <div class="footer-public__col footer-public__col_name_right">
          <ul class="footer-public__links">
            <li class="footer-public__links-item">
              <a
                href="https://www.dpomos.ru/"
                class="footer-public__links-link"
                aria-label="Портал ДПО"
                target="_blank"
              >
                <img
                  src="@/assets/img/public-logo_donm.png"
                  alt="Логотип портала ДПО"
                  class="footer-public__links-image"
                />
              </a>
            </li>
            <li class="footer-public__links-item">
              <a
                href="https://corp-univer.ru/"
                class="footer-public__links-link"
                aria-label="Сайт Корпоративного университета"
                target="_blank"
              >
                <img
                  src="@/assets/img/public-logo_corpuniver.png"
                  alt="Логотип корпоративного университета"
                  class="footer-public__links-image"
                />
              </a>
            </li>
            <li class="footer-public__links-item">
              <a
                href="https://www.mos.ru/"
                class="footer-public__links-link"
                aria-label="сайт мэра москвы"
                target="_blank"
              >
                <img
                  src="@/assets/img/public-logo_mosru.png"
                  alt="Логотип сайта мэра москвы"
                  class="footer-public__links-image"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
