# Инструкции по деплою на Vercel

## Необходимые переменные окружения

Для корректной работы приложения на Vercel необходимо настроить следующие переменные окружения:

### `NEXT_PUBLIC_API_URL`

Базовый URL для доступа к API бэкенда. Например: `http://api.yourbackend.com`

## Как настроить переменные окружения на Vercel

1. Откройте проект на Vercel
2. Перейдите в раздел "Settings"
3. Выберите вкладку "Environment Variables"
4. Добавьте переменную `NEXT_PUBLIC_API_URL` с соответствующим значением
5. Нажмите "Save"
6. Перезапустите деплой (Redeploy) для применения изменений

## Архитектура API в приложении

В этом приложении реализована система прокси-запросов через Next.js API маршруты, чтобы избежать проблемы смешанного контента (Mixed Content).

Вместо прямых обращений от браузера к HTTP-бэкенду, все запросы проходят через API-маршруты Next.js на сервере, что позволяет:

1. Выполнять запросы к HTTP-бэкенду из HTTPS-приложения без ошибок браузера
2. Сохранить единый интерфейс для взаимодействия с API
3. При необходимости добавить дополнительную логику или кэширование запросов

Все API-маршруты находятся в директории `src/app/api/` и используют общий обработчик `apiHandler` из `src/utilities/apiHandler.ts`.

## Важно!

Если вы получаете ошибку 405 Method Not Allowed или 500 Internal Server Error, убедитесь, что:

1. Переменная `NEXT_PUBLIC_API_URL` корректно настроена
2. Бэкенд доступен и обрабатывает запросы по указанному URL
3. Обновите деплой после изменения переменных окружения
4. На сервере не блокируются запросы с серверов Vercel
