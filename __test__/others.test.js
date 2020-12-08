const parser = require('..')

describe('various other beacon data', () => {

    it ('Windows 10 Desktop', () => {
        const message = '$GPRP,3D0A662DC412,C3674946C293,-62,1EFF0600010920025E294E5E30809130E56E2CA4701DC8EBED5396B6320B8F'
        parser.parseMessage(message, (data) => {
            const msd = data.advertisement.manufacturerData
            expect(msd.company).toBe('Microsoft')
            expect(msd.type).toBe('Windows 10 Desktop')
            expect(msd.slat).toBe('5E294E5E')
            expect(msd.is('windows')).toBe(true)
        })
    })

    it ('iBeacon', () => {
        const payload = '0201061AFF4C000215B9A5D27D56CC4E3AAB511F2153BCB96700010359D6'
        const advertisement = parser.parsePayload(payload)
        const msd = advertisement.manufacturerData
        expect(msd.company).toBe('Apple, Inc.')
        expect(msd.uuid).toBe('B9A5D27D-56CC-4E3A-AB51-1F2153BCB967')
        expect(msd.major).toBe(1)
        expect(msd.minor).toBe(857)
        expect(msd.tx).toBe(-42)
        expect(msd.is('ibeacon')).toBe(true)
    })

    // eslint-disable-next-line jest/no-commented-out-tests
    // it ('Multi MSD, iBeacon + iBS04i', () => {
    //     const payload = '0201061AFF4C000215B9A5D27D56CC4E3AAB511F2153BCB96700010359D602010612FF0D0083BC290100AAAAFFFF000018030000'
    //     const advertisement = parser.parsePayload(payload)
    //     const msd = advertisement.manufacturerData
    //     expect(msd.company).toBe('Apple, Inc.')
    //     expect(msd.uuid).toBe('E09610A7F5D060B0D248FBDFB56DC5E2')
    //     expect(msd.major).toBe(1)
    //     expect(msd.minor).toBe(857)
    //     expect(msd.tx).toBe(-42)
    // })

    it ('Empty payload message', () => {
        const message = '$GPRP,3D0A662DC412,C3674946C293,-62,'
        parser.parseMessage(message, (data) => {
            const msd = data.advertisement.manufacturerData
            expect(msd).toBe(undefined)
        })
    })

    it ('Empty payload message with timestamp', () => {
        const message = '$GPRP,3D0A662DC412,C3674946C293,-62,,1575440728'
        parser.parseMessage(message, (data) => {
            const msd = data.advertisement.manufacturerData
            expect(msd).toBe(undefined)
            expect(data.timestamp).toBe(1575440728000)
        })
    })
})
