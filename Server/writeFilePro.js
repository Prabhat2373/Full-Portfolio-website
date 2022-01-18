const { rejects } = require("assert")
const { resolve } = require("path")
const fs = require("fs");

class writeFilePro {
    writeFile(file,data){
        return new Promise((resolve,rejects)=>{
            fs.writeFile(file,data,"utf-8",(err)=>{
                if(err) rejects(err)
                resolve(data)
            })
        })
    }
}

module.exports = writeFilePro;