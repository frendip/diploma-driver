# Generator Dispatch — Driver

Веб-приложение водителя, доставляющего мобильный генератор на подстанцию. Показывает автомобиль, назначенный маршрут, оставшиеся время и расстояние, данные водителя и экран статистики. Текущая версия содержит демонстрационное движение по маршруту и пример статистики, а не полноценную GPS-навигацию.

**Стек:** React 18, TypeScript, Redux Toolkit / RTK Query, React Router, Tailwind CSS, Yandex Maps JS API v3, Chart.js, Workbox.

## Требования

- Node.js 22.x и npm 10.x.
- Git и современный браузер с доступом к интернету.
- Собственный ключ Yandex Maps JS API v3.
- Запущенный [generator-dispatch-api](https://github.com/frendip/generator-dispatch-api) на `http://localhost:4000`, подготовленная база и существующий автомобиль. Для показа маршрута автомобилю должен быть назначен маршрут.

## Локальный запуск

1. Клонируйте репозиторий и установите зависимости:

   ```bash
   git clone https://github.com/frendip/generator-dispatch-driver.git
   cd generator-dispatch-driver
   npm ci
   ```

2. Скопируйте `.env.example` в `.env` и замените значение `REACT_APP_YMAPS_API_KEY` своим ключом:

   ```dotenv
   REACT_APP_YMAPS_API_KEY=YOUR_YANDEX_MAPS_API_KEY
   ```

   Настройте разрешённые адреса в кабинете Яндекса. Ключ подставляется в HTML и виден посетителю; серверные секреты сюда помещать не нужно. Файлы `.env` исключены из Git.

3. Запустите API, затем приложение:

   ```bash
   npm start
   ```

Откройте `http://localhost:3000/?driverId=1`, заменив `1` на существующий `car_id` из базы API. Несмотря на имя параметра `driverId`, приложение использует его как ID автомобиля. Без этого параметра оно не сможет загрузить нужные данные.

Если порт 3000 занят диспетчерским интерфейсом, добавьте в `.env` строку `PORT=3001` и открывайте `http://localhost:3001/?driverId=1`. После изменения `.env` перезапустите сервер. Адрес API задан в `src/api/ApiService.ts`.

## Сборка

```bash
npm run build
```

Результат появится в `build/`. Для работы собранного приложения нужны API, данные автомобиля и ключ карты. Контактные данные и статистика в демонстрационном интерфейсе не являются реальными пользовательскими данными.

## Связанные репозитории

- [generator-dispatch-api](https://github.com/frendip/generator-dispatch-api) — сервер; в README описана подготовка базы.
- [generator-dispatch-web](https://github.com/frendip/generator-dispatch-web) — интерфейс диспетчера.

Установка и сборка проверены на Node.js 22.22.3 и npm 10.9.8. Полный сценарий с PostgreSQL и внешними сервисами требует отдельной настройки.
