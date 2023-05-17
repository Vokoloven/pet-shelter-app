import { AccessType } from 'types/globalTypes'

export function createMenuData(tab: string | null, access: AccessType) {
    if (
        access.actualAccess !== null &&
        tab === 'UserAccess' &&
        access.actualAccess === access.admin
    ) {
        return tab
    } else if (tab === 'AddPet' && access.actualAccess !== null) {
        return tab
    } else if (tab === 'Favorite' && access) {
        return tab
    } else {
        return null
    }
}
