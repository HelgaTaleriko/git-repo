
export class Search {

    constructor(view) {
        this.view = view
        this.view.searchInput.addEventListener('keyup', this.debounce(this.loadRepo.bind(this), 500))

    }

    async loadRepo() {  // загрузка списка репо
        const searchValue = this.view.searchInput.value;
        let users;
        if (searchValue) {
            return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per-page=5`)
                .then((res) => {
                    if (res.ok) {
                        this.clearUsers()
                        res.json().then(res => {
                            users = res.items.slice(0,5);
                            users.forEach(user => this.view.createRepoList(user))
                        })
                    }
                })

        } else {
            this.clearUsers()
        }

    }

    clearUsers() {
        this.view.usersList.innerHTML = ''
    }

    debounce(func, wait, immediate) { // отложеная отправка
        let timeout
        return function () {
            const context = this, args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }

}
