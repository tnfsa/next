// log the pageview with their URL
export const pageview = (url) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
    })
}

// log specific events happening.
export const event = ({ action, params }) => {
    window.gtag('event', action, params)
}

export const purchase = ({store_name,item_name,price,qty})=>{
    window.gtag('event','purchase',{
        store_name,
        item_name,
        price,
        qty
    })
}