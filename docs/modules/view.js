export class View {
    constructor() {
        this.app = document.getElementById('app')
        this.title = this.createElement('h1', 'title')
        this.title.textContent = 'Github search Users'

        this.searchLine = this.createElement('div', 'search-line')
        this.searchInput = this.createElement('input', 'search-input')
        this.searchCounter = this.createElement('span', 'counter')
        this.searchLine.append(this.searchInput)
        this.searchLine.append(this.searchCounter)


        this.usersWrapper = this.createElement('div', 'users-wrapper')
        this.usersList = this.createElement('div', 'users')
        this.usersWrapper.append(this.usersList)

        this.favoriteRepo = this.createElement('div', 'favorite-repo')


        this.main = this.createElement('div', 'main')
        this.main.append(this.usersWrapper)
        this.main.append(this.favoriteRepo)


        this.app.append(this.title)
        this.app.append(this.searchLine)
        this.app.append(this.main)
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass)
        }
        return element

    }

    createRepoList(userData) { //cоздаем список элементов
        const userElement = this.createElement('div', 'repo-list')
        userElement.innerHTML = `<span class='repo-list-name'>Name: ${userData.name}</span>`;

        this.usersList.append(userElement)
        userElement.addEventListener('click', () => {
            //вешаем обработчик на элементы списка чтобы переносились в другой
            this.favoriteWrapperElement = this.createElement('div', 'favorite-wrapper-element')
            const favoriteRepoItem = this.createElement('div', 'favorite-repo-item')
            const btnFavoriteDel = this.createElement('button', 'btn-favorite-del')

            favoriteRepoItem.innerHTML = `<span class='repo-list-name'>Name: ${userData.name}</span>
                                 <span class="repo-list-owner">Owner: ${userData.owner.login}</span>
                                 <span class="repo-list-stars">Stars: ${userData.stargazers_count}</span>`;
            favoriteRepoItem.id = userData.name
            btnFavoriteDel.innerHTML = 'X'
            this.favoriteWrapperElement.append(favoriteRepoItem, btnFavoriteDel)
            this.favoriteRepo.append(this.favoriteWrapperElement)
            this.searchInput.value = ''

            btnFavoriteDel.addEventListener('click', (event) => {  //кнопка удалить
                event.target.parentElement.remove()

            })
            this.usersList.innerHTML = ''

        })


    }


}