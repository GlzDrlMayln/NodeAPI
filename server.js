const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/studentModel');
const app = express();


app.use(express.json());//middleware

//routes

/*app.get('/', (req, res) => {
    res.send('Hello NODE API');
})*/

/*app.get('/blog', (req, res) => {
    res.send('Hello BLOG,im sadness');
})*/

app.get('/students', async(req, res) => {
    try{
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/students/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const student = await Student.findById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/students', async(req,res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.put('/students/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body);
        //if student cannot be find in database
        if(!student){
            return res.status(404).json({message: 'cannot find any student with ID ${id}' });
        }
        const updatedStudent = await Student.findById(id);
        res.status(200).json(updatedStudent);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.delete('/students/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(404).json({message: 'cannot find any student with ID ${id}' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


mongoose.
connect('mongodb+srv://root:QWERTY_123@myapi.xkitx.mongodb.net/Student_API?retryWrites=true&w=majority&appName=MyAPI')
.then(() => {
    console.log('connected to MongoDB');
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000');
    });    
})
.catch((error) => {
    console.log(error)
});