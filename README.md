# state-app

node v18.12.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




Сами файлы находятся в:
/app/expert-front

Обновлять через:
git pull

Перезапускать:
docker compose restart

При обновлении библиотек скорее всего надо будет пересобирать сам образ докера (обычный рестарт не поможет), но это по факту выяснится, сейчас не могу сказать.

Сама пересборка с нуля

Очистка:
docker compose stop
docker ps -a (найти номер контейнера в списке)
docker rm номер_контейнера
docker images (найти номер образа)
docker rmi номер_образа

Установка:
docker compose up -d