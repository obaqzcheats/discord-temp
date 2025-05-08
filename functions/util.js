const log = async (type, msg) => {
    // if (!config.debug && type == "debug") return
    let time = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}`
    console.log(`   \x1b[1;35m${time} \x1b[1;37m~ \x1b[1;35m${type}\x1b[1;37m ${msg}\x1b[0m`)
}

// other functions here

module.exports = { log };