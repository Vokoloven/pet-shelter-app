import { AccessType } from 'types/globalTypes'

export function createMenuData(
    tab: string | null,
    access: AccessType,
    loggedIn: boolean
) {
    if (
        access.actualAccess !== null &&
        tab === 'UserAccess' &&
        access.actualAccess === access.admin
    ) {
        return tab
    } else if (access.actualAccess !== null && tab === 'AddPet') {
        return tab
    } else if (loggedIn && tab === 'Favorite') {
        return tab
    } else {
        return null
    }
}
