const update_time = new Date()


export default function handler(req,res){
    return res.status(200).json({
        update_time
    })
}
