# Popular Repos
Most popular JS repos

## Getting started

### Configuration

Для конфигурации приложения, необходимо:
- Зарегистрировать GitHub Application по адресу https://github.com/settings/applications/new
    * Homepage URL указать `http://localhost:3030`
    * Authorization callback URL указать `http://localhost:3030` 
- Переопределить несколько параметров конфигурации:
    * `user` - Имя пользователя GitHub
    * `githubClientId` - `clientId` зарегистрированного приложения
    * `githubClientSecret` - `clientSecret` зарегистрированного приложения

#### Переопределение параметров конфигурации через создание нового файла
- Создать файл `config.local.js` в папке `./config`
- Экспортировать из него объект с переопределяемыми параметрами. Пример содержимого файла `config.local.js`:
    ```javascript
    module.exports = {
      user: 'username',
      githubClientId: 'clientId',
      githubClientSecret: 'clientSecret',
    };
    ```
#### Переопределение параметров конфигурации через переменные окружения
Перед сборкой проекта проекта установите переменные окружения в формате `CONF_<configKey>`
Пример
```shell script
export CONF_user=username
export CONF_githubClientId=clientId
export CONF_githubClientSecret=clientSecret
```

### Install Dependencies
```shell script
npm i
```

### Start
```shell script
npm run start
```
Проект работает только на `http://localhost:3030`, т.к. не добавлена конфигурация `redirect_uri`
