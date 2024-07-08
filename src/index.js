import {connectDB} from './db/index.db.js'
import {app} from './app.js';

const PORT = process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server run at: http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.log('MongoDB connection FAILED: ',err);
})