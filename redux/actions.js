export const SETPROFILE = "SETPROFILE"
export const RESETPROFILE = "RESETPROFILE"

export const resetProfile = () => ({ type: RESETPROFILE })
export const setProfile = (value) => ({ type: SETPROFILE, payload: value })
export const setRedirect = (value) => ({ type: SETREDIRECT, payload: value })
export const setTheme = (value) => ({ type: SETTHEME, payload: value })
