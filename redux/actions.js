export const SETPROFILE = "SETPROFILE"
export const RESETPROFILE = "RESETPROFILE"

export const resetProfile = () => ({ type: RESETPROFILE })

export const setProfile = (value) => ({type:SETPROFILE,payload: value})