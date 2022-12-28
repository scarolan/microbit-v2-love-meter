function processSignalStrength (signal: number) {
    if (Math.abs(signal) < 65) {
        basic.showLeds(`
            . # . # .
            # # # # #
            # # # # #
            . # # # .
            . . # . .
            `)
        if (input.runningTime() - lastsong > 5000) {
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.happy), SoundExpressionPlayMode.InBackground)
            lastsong = input.runningTime()
        }
    } else if (Math.abs(signal) >= 65 && Math.abs(signal) <= 75) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . # # # .
            . . # . .
            . . . . .
            `)
    } else if (Math.abs(signal) > 75) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
}
function ping () {
    radio.sendValue("address", address)
}
radio.onReceivedValue(function (name, value) {
    if (name == "address" && value == address) {
        packetstrength = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        serial.writeLine("Packet strength: " + packetstrength)
        processSignalStrength(packetstrength)
        lastping = input.runningTime()
    }
})
let lastping = 0
let packetstrength = 0
let lastsong = 0
let address = 0
radio.setGroup(1)
// Set the address to match the one on other micro:bits
address = 1337
music.setVolume(64)
lastsong = -5000
basic.forever(function () {
    ping()
    if (input.runningTime() - lastping > 2000) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
