# Frontend часть CRM системы

## Структура проекта
Для удобства работы над проектом следует придерживаться следующей структуры:
```
- public        // Статические файлы, выдаваемые веб-сервером до инициализации vue
- src           // Исходный код
    \
    |- main.ts  // Главный исполняемый файл, здесь происходит инициализация vue
    |- App.vue  // App-компонент, является корневым в приложении
    |- assets   // Статические файлы, доступные после инициализации vue
    |- shared   // Файлы reusable компонентов, стилей и т.д.
    |       \
    |       |- components
    |       |- styles
    |       |  ...
    |
    |- router   // Файлы внутреннего маршутизатора vue
    |       \
    |       |- index.ts  // Основной файл маршрутизатора, в нем задаются все маршруты
    |       |  ...
    |
    |- store  // Файлы хранилища состояния Vuex
    |       \
    |       |- index.ts // Основной файл хранилища
    |       |  ...
    |
    |- home   // Файлы 
    |       \
    |       |- Home.vue     // Основной файл страницы (view)
    |       |- components   // Директория с компонентами, которые используются в Home.vue
    |       |         \
    |       |         |- Component1.vue  // Файл компонента
    |       |         |- Component2.vue
    |       |         |  ...
    |       |- subview      // Директория с вьюшками, которые размещаются в родительском view (полезно, когда у нас на одной странице
    |       |         \     // может показываться различный контент, в зависимости от роли пользователя)
    |       |         |- Subview.vue
    |       |         |- components
    |  ...
- tests // Тесты
```

Для унифицированного стиля кода, прошу всех придерживаться [рекомендаций от разработчиков Vue](https://v3.vuejs.org/style-guide/#rule-categories). Линтер настроен на соблюдение этих правил, но пока не настроен на работу с `.ts` файлами в самом редакторе, поэтому при появлении ошибки в приложении, внимательно прочитайте, возможно это ругается линтер на нарушение стилистики в `.ts` файле.

## Первый запуск
Для запуска проекта и выполнения команд потребуется установленный [NodeJS](https://nodejs.org/en/).
Рекомендую использовать LTS версию для избежания конфликтов.

Для запуска нужно клонировать проект в удобную для вас папку. После чего в консоли перейти в эту папку и выполнить:
```
npm install
```
После этого npm произведет инициализацию проекта в папке и загрузит все необходимые зависимости из `package.json`.

После успешного завершения команды, проверить работоспособность можно выполнив команду:
```
npm run serve
```
Данная команда запустит сервер разработки, в само приложение можно попасть по адресу: `http://localhost:8080`

### Vue CLI
Для удобной работы с проектом стоит установить [Vue CLI](https://cli.vuejs.org/) - набор инструментов для управления проектами на Vue.
Устанавливается по команде:
```
npm install -g @vue/cli
```
Команду можно выполнять из любой директории, так как пакет устанавливается глобально.

После установки становится доступной команда `vue`. Для проверки установки можете выполнить команду `vue -v` (выведет версию Vue CLI).
Получить краткую помощь по Vue CLU возможно командой `vue -h`

### Vue UI
Vue CLI предлагает использовать Vue UI - локальное веб-приложение для работы с проектами.
Приложение запускается по команде:
```
vue ui
```

После запуска должна открыться вкладка в браузере. Выбрав проект, можно запускать dev-сервер прямо из интерфейса. Для этого нужно перейти во вкладку "Задачи", затем выбрать `serve` и нажать на кнопку "Запустить задачу". После успешной первоначальной сборки можно открывать приложение, нажав на соответствующую кнопку.

### Hot Reload
Vue поддерживает возможность hot reload'а при запущенном сервере разработки. Поэтому можно спокойно работать в проекте и сохранять изменения, после чего произойдет быстрое пересобирание измененных файлов. Обращаю внимание на то, что при добавлении новых файлов, удалении или перемещении файлов hot reload может не сработать или сработать неверно, поэтому советую перезапустить задачу.

### Сборка приложения для production
Для полной сборки и минификации приложения воспользуйтесь командой
```
npm run build
```
Или используйте `vue ui` и уже там выполните задачу build.

### Юнит-тесты
```
npm run test:unit
```

### E2E-тесты
```
npm run test:e2e
```
### Также необходимо установить
```
npm i --save lodash
npm install webpack@^4.40.0 --save-dev
npm install @types/lodash
npm install --save vuex-persistedstate
```
