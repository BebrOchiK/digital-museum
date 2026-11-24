# DIGITAL MUSEUM

Інтерактивний цифровий музей на React + TypeScript з каталогом експонатів, пошуком за назвою/автором, фільтрацією за залами, сторінкою деталей експоната та книгою відвідувачів із збереженням даних у `localStorage`.

## Використані технології
- React, TypeScript, Vite
- React Router DOM
- `localStorage` для зберігання користувацьких експонатів і записів книги відвідувачів
- Docker (multi-stage build, `.dockerignore`, BuildKit cache mount) та `serve`

## Структура Dockerfile та Multi-stage build
- **Етап 1 (`build`)**: використовує `node:22-alpine`, копіює `package*.json`, встановлює залежності через `npm ci` (з кешуванням npm), копіює вихідний код і збирає статичний білд у `/app/dist` (`npm run build`).
- **Етап 2 (`production`)**: окремий фінальний етап на базі `node:22-alpine` зі встановленим `serve`, куди копіюється лише `/app/dist`. Вихідний код і `node_modules` у фінальний образ не переносяться.

## Додаткові оптимізації
- **BuildKit cache mount** (`--mount=type=cache,target=/root/.npm`) прискорює встановлення залежностей при повторних збірках.
- **`.dockerignore`** виключає `node_modules`, `dist`, `.git`, локальні `.env` та файли IDE/тимчасові файли з контексту збірки.

## Docker Hub та версії
- Репозиторій: `https://hub.docker.com/r/obigail/digital-museum`
- Доступні версії: `1.0`, `2.0`

## Завантаження та запуск
```bash
docker pull obigail/digital-museum:2.0
docker run -d --name digital-museum-app -p 3000:3000 obigail/digital-museum:2.0