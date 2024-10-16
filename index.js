const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('dev'))


app.get('/', (req,res)=>{
    res.send('Working')
})


const PORT  = 4300
app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})