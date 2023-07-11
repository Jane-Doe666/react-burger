# Проект Stellar Burgers

это приложение для заказа бургера. Пользователю необходимо зарегистрироваться или войти в приложение, выбрать ингредиенты из списка и одобрить оформление заказа.

[](url)

## Содержание

- Функционал
- Технологии
- [Начало работы](#Начало работы)
- Тестирование
- Deploy и CI/CD

## Функционал

- регистрация
- авторизация
- востановление пароля
- создание заказа
- лента заказов

  > история последних 50 заказов в приложении в общем доступе. Обновляется в режиме реального времени (сокет-соединение), когда авторизованный пользователь создаёт заказ. Незарегистрированный пользователь может кликнуть по любому заказу на странице `/feed` и перейти на экран детальной страницы заказа `/feed/:id`

- личный кабинет пользователя

  > история всех заказов доступна только авторизованным пользователям. Также обновляется в режиме реального времени (сокет-соединение) и отображает статусы выполненных заказов. Пользователь может кликнуть по любому заказу в личном кабинете `/profile/orders` и перейти на экран детальной страницы заказа `/profile/orders/:id`

## Технологии

- HTML
- CSS
- JavaScript
- React
- Redux
- TypeScript

## Начало работы

Скачать проект по ссылке:
[Stellar Burgers](https://github.com/Jane-Doe666/react-burger)

Установка зависимостей
Для установки зависимостей, выполните команду:

`$ npm i`

Запуск Development проекта
Чтобы запустить проект для разработки, выполните команду:

`npm start`

## Тестирование

проект покрыт юнит-тестами Jest. Для их запуска выполните команду:

`npm run *test*`

Создание билда
Чтобы выполнить production сборку, выполните команду:

`npm run build`

## Deploy и CI/CD

Расскажите, как развернуть приложение. Как запустить пайплайны и т.д.

Ссылка на деплой проекта -
