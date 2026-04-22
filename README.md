# Auction Platform

Проект в разработке 🚧

## Что есть сейчас
- Авторизация
- Получение/Создание лотов
- SSR на Next.js

## Планируется
- Страница лота
- Система ставок
- Личный кабинет
- Оптимизация, обработка ошибок

## Стек
Next.js, NestJS, PostgreSQL, Prisma, ImageKit



#### #### #### #### #### ####

## client/.env
NEXT_PUBLIC_API_BASE_URL="http://localhost:5005"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/g0hdjyra7"

## server/.env
DATABASE_URL="" !postgresql!
JWT_SECRET=""
CLIENT_URL="" -> http://localhost:3000 default
PORT="" -> 5005 default

## Фронт - client
cd client -> npm i -> npm run dev

## Бэк - server
cd server -> npm i -> npx prisma db push -> npx prisma generate -> npm run dev
