'use strict'
module.exports = class S321 {
    constructor(address, mode, parameter, value) {
        this.address = address
        this.mode = mode
        this.parameter = parameter
        this.value = value
    }

    _addressArray() {
        if (/^\d{1,3}$/.test(this.address) && parseInt(this.address) <= 247) {
            return this.address = [parseInt(this.address)]
        }
        else {
            throw new Error('Wrong address!')
        }
    }

    _modeArray() {
        if (/^[36]$/.test(this.mode)) {
            return this.mode = [parseInt(this.mode)]
        }
        else {
            throw new Error('Wrong mode!')
        }
    }

    _parameterArray(item) {
        let f = ['f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc']
        if (/^f[\da-c]\.\d{2}$/i.test(item)) {
            item = item.toLowerCase().split('.')
            return [f.indexOf(item[0]), parseInt(item[1])]
        } else if (/^d\.\d{2}$/i.test(item)) {
            return [0x70, parseInt(item.split('.')[1])]
        } else if (/^[1-38]0{3}$/.test(item)) {
            return [parseInt(item.substring(0, 1), 16), 0x00]
        } else {
            throw new Error('Wrong parameter!')
        }
    }

    _valueArray(item) {
        if (/^\d{1,5}$/.test(item) && parseInt(item) <= 65535) {
            item = parseInt(item).toString(16)
            item = '0'.repeat(4 - item.length) + item
            item = item.match(/..?/g)
            return [parseInt(item[0], 16), parseInt(item[1], 16)]
        }
        else {
            throw new Error('Wrong value!')
        }
    }

    static modbusCrc(msg) {
        let crc = 0xFFFF
        let poly = 0xA001
        for (let n in msg) {
            crc ^= msg[n]
            for (let i = 0; i < 8; i++) {
                if (crc & 1) {
                    crc >>= 1
                    crc ^= poly
                } else {
                    crc >>= 1
                }
            }
        }
        crc = crc.toString(16)
        crc = '0'.repeat(4 - crc.length) + crc
        crc = crc.match(/..?/g)
        return [parseInt(crc[1], 16), parseInt(crc[0], 16)]
    }
    get msgNum() {
        let msg = this._addressArray().concat(this._modeArray(), this._parameterArray(this.parameter), this._valueArray(this.value))
        return msg.concat(this.constructor.modbusCrc(msg))
    }

    get msgStr() {
        let hex = ''
        this.msgNum.forEach(item => {
            item = item.toString(16)
            hex += '0'.repeat(2 - item.length) + item
        })
        return hex
    }

    set setMsg([address = this.address, mode = this.mode, parameter = this.parameter, value = this.value] = []) {
        this.address = address
        this.mode = mode
        this.parameter = parameter
        this.value = value
    }
}