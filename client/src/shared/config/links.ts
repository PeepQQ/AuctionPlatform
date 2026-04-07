export const links = {
    home: {
        label: 'Главная',
        href: '/'
    },
    signIn: {
        label: 'Вход',
        href: '/signIn'
    },
    signUp: {
        label: 'Регистрация',
        href: '/signUp'
    },
    createLot: {
        label: 'Создать лот',
        href: '/createLot'
    },
    lotPage: {
        label: 'Страница лота',
        href: (lotId: number) => '/lot/' + lotId
    }
}

export const headerLinks = [
    links.home
]