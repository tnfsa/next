export default function Debug(){
    if(typeof window !== 'undefined'){
        console.log(`Bearer: ${localStorage.getItem('session')}`)
        console.log(`Account type: ${localStorage.getItem('account_type')}`)
        console.log(`type of account type: ${typeof(localStorage.getItem('account_type'))}`)
        console.log(`Alert: ${localStorage.getItem('alert')}`)
    }
    return(
        <h1>Testing</h1>
    )
}