const express = require('express')
const morgan = require('morgan')
const userRouter = require('./Routes/useRouter')

const app = express()

app.use(express.json())
app.use(morgan('dev'))



app.get('/', (req,res)=>{
    res.send('Working')
})


app.use('/users', userRouter)

const PORT  = 4300
app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})