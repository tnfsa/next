export const SETPROFILE = "SETPROFILE"
export const RESETPROFILE = "RESETPROFILE"
export const SETREDIRECT = "SETREDIRECT"
export const SETTHEME = "SETTHEME"
export const CART_ADDITEM = "CART_ADDITEM"
export const CART_CONFIGITEM = "CART_CONFIGITEM"
export const CART_SETFROM = "CART_SETFROM"
export const CART_SETINSTANT = "CART_SETINSTANT"
export const CART_INSTANT_CLEAR = "CART_INSTANT_CLEAR"
export const CART_CART_CLEAR = "CART_CART_CLEAR"


// profile
export const resetProfile = () => ({ type: RESETPROFILE })
export const setProfile = (value) => ({ type: SETPROFILE, payload: value })

// settings
export const setRedirect = (value) => ({ type: SETREDIRECT, payload: value })
export const setTheme = (value) => ({ type: SETTHEME, payload: value })

// cart
export const cart_addItem = (value) => ({ type: CART_ADDITEM, payload: value })
export const cart_configItem = (value) => ({ type: CART_CONFIGITEM, payload: value })
export const cart_setFrom = (value) => ({ type: CART_SETFROM, payload: value })
export const cart_setInstant = (value) => ({ type: CART_SETINSTANT, payload: value })
export const cart_clearInstant = () => ({ type: CART_INSTANT_CLEAR })
export const cart_clearCart = () => ({ type: CART_CART_CLEAR })