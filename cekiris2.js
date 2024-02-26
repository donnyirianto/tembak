const fs = require('fs'); 
const Models = require('./models/model');
const dayjs = require('dayjs');


process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 

const deleteFile = (filePath) => {
  // Unlink the file.
  fs.unlink(filePath, (error) => {
    if (!error) {
       return "Sukses Hapus"
    } else {
      return "Gagal Hapus"
    }
  })
};

const doitBro = async () => { 
    try{  
            
      const start = new Date();
      console.log("Running At : " + start)  
        const dataAcuan =['F32L2023-08-16011000000035',
        'F5CT2023-08-16022000000230',
        'F6CV2023-08-16021000000050',
        'F73A2023-08-16011000000196',
        'FD532023-08-16011000000023',
        'FFCD2023-08-16021000000029',
        'FSSI2023-08-16022000000050',
        'T4RL2023-08-16022000000048',
        'T5882023-08-16021000000082',
        'T5CF2023-08-16012000000209',
        'T6Y72023-08-16021000000007',
        'T8BU2023-08-16013000000036',
        'TB012023-08-16012000000087',
        'TB022023-08-16034000000018',
        'TB2U2023-08-16012000000141',
        'TBEL2023-08-16012000000012',
        'TBEL2023-08-16022000000092',
        'TCOA2023-08-16022000000047',
        'TDOL2023-08-16012000000015',
        'TGYF2023-08-16011000000068',
        'THK12023-08-16011000000055',
        'TLBL2023-08-16012000000088',
        'TLEA2023-08-16012000000075',
        'TLHW2023-08-16022000000147',
        'TM3N2023-08-16021000000094',
        'TMJ62023-08-16021000000039',
        'TNUA2023-08-16011000000164',
        'TOU52023-08-16012000000030',
        'TQ3N2023-08-16022000000058',
        'TQ642023-08-16031000000165',
        'TR3S2023-08-16012000000030',
        'TRB22023-08-16012000000015',
        'TUAN2023-08-16021000000122',
        'TUHO2023-08-16012000000122',
        'TUMA2023-08-16012000000042',
        'TVNB2023-08-16012000000096',
        'TWZA2023-08-16012000000010',
        'TZKE2023-08-16012000000041',
        'TZPG2023-08-16021000000029',
        'F13U2023-08-17011000000039',
        'F17S2023-08-17021000000018',
        'F1NI2023-08-17022000000059',
        'F23Q2023-08-17011000000048',
        'F26U2023-08-17011000000064',
        'F49D2023-08-17012000000045',
        'F7G42023-08-17011000000016',
        'FC802023-08-17012000000173',
        'FFG72023-08-17012000000115',
        'FFXY2023-08-17021000000029',
        'FFZE2023-08-17011000000039',
        'FL9D2023-08-17012000000034',
        'FR432023-08-17011000000039',
        'FUKG2023-08-17012000000144',
        'T28R2023-08-17011000000004',
        'T7LC2023-08-17022000000007',
        'T7PV2023-08-17022000000069',
        'T84K2023-08-17041000000044',
        'T92I2023-08-17012000000072',
        'TA8H2023-08-17031000000102',
        'TBGS2023-08-17012000000037',
        'TD2G2023-08-17022000000051',
        'TDSU2023-08-17021000000185',
        'TEGY2023-08-17011000000032',
        'TEPJ2023-08-17024000000018',
        'TF732023-08-17012000000110',
        'TG002023-08-17022000000038',
        'TGIF2023-08-17022000000043',
        'THA12023-08-17011000000123',
        'THA12023-08-17012000000127',
        'THK12023-08-17011000000194',
        'TIF02023-08-17011000000091',
        'TIZE2023-08-17012000000058',
        'TK5S2023-08-17022000000087',
        'TOEI2023-08-17021000000012',
        'TOOI2023-08-17022000000047',
        'TOTL2023-08-17012000000050',
        'TPUP2023-08-17011000000010',
        'TQ092023-08-17022000000020',
        'TQ192023-08-17022000000096',
        'TQ282023-08-17013000000041',
        'TR9B2023-08-17012000000036',
        'TSN22023-08-17021000000113',
        'TSYS2023-08-17022000000064',
        'TTPP2023-08-17011000000095',
        'TUNV2023-08-17021000000149',
        'TVAL2023-08-17022000000114',
        'TWIZ2023-08-17021000000093',
        'TX2F2023-08-17021000000056',
        'TXGC2023-08-17011000000136',
        'TXSJ2023-08-17024000000005',
        'F01O2023-08-18011000000138',
        'F2G22023-08-18012000000101',
        'F94C2023-08-18011000000032',
        'F95S2023-08-18011000000064',
        'FAGN2023-08-18021000000062',
        'FEGS2023-08-18012000000016',
        'FETS2023-08-18022000000156',
        'FJT12023-08-18022000000048',
        'FLHT2023-08-18012000000117',
        'FLWJ2023-08-18012000000062',
        'FQT22023-08-18012000000022',
        'FUNY2023-08-18011000000048',
        'FV3G2023-08-18012000000091',
        'T0NG2023-08-18022000000127',
        'T2QH2023-08-18041000000007',
        'T3L82023-08-18012000000013',
        'T4LR2023-08-18011000000051',
        'T53W2023-08-18012000000077',
        'T5NG2023-08-18012000000085',
        'TA6A2023-08-18041000000080',
        'TAY42023-08-18022000000059',
        'TFTI2023-08-18012000000179',
        'TIRM2023-08-18012000000054',
        'TKIU2023-08-18022000000040',
        'TMCR2023-08-18022000000056',
        'TO3E2023-08-18022000000053',
        'TOOK2023-08-18011000000040',
        'TPFG2023-08-18022000000047',
        'TQ2I2023-08-18021000000046',
        'TRHD2023-08-18021000000043',
        'TRRW2023-08-18022000000175',
        'TV8U2023-08-18022000000016',
        'TVIF2023-08-18022000000116',
        'TVK72023-08-18022000000058',
        'TVLR2023-08-18012000000034',
        'TYEY2023-08-18011000000015',
        'TZRI2023-08-18022000000015',
        'TQ2I2023-08-18021000000045',
        'F90F2023-08-18011000000046',
        'F26U2023-08-19012000000086',
        'F4HE2023-08-19021000000100',
        'FACT2023-08-19022000000021',
        'FDA22023-08-19012000000006',
        'FGL12023-08-19022000000121',
        'FGUE2023-08-19022000000094',
        'FWUD2023-08-19021000000055',
        'FZDZ2023-08-19022000000127',
        'T15R2023-08-19012000000038',
        'T1O72023-08-19012000000214',
        'T5ZB2023-08-19011000000027',
        'T6AV2023-08-19012000000016',
        'T6ZS2023-08-19011000000241',
        'TALL2023-08-19011000000040',
        'TARK2023-08-19021000000031',
        'TBSE2023-08-19021000000036',
        'TE6W2023-08-19011000000024',
        'TECP2023-08-19022000000021',
        'TENE2023-08-19022000000182',
        'TETU2023-08-19012000000062',
        'TFMT2023-08-19012000000037',
        'TFN62023-08-19022000000101',
        'THUV2023-08-19021000000050',
        'TLFV2023-08-19021000000094',
        'TLJX2023-08-19021000000070',
        'TQHH2023-08-19011000000012',
        'TRIG2023-08-19011000000007',
        'TROG2023-08-19021000000082',
        'TRRK2023-08-19031000000195',
        'TS492023-08-19012000000184',
        'TSC62023-08-19021000000046',
        'TU1N2023-08-19021000000178',
        'TUF82023-08-19011000000165',
        'TUUQ2023-08-19013000000093',
        'TW5H2023-08-19021000000072',
        'F2BK2023-08-20012000000093',
        'F2BK2023-08-20022000000070',
        'F2T02023-08-20022000000067',
        'F57Q2023-08-20012000000034',
        'F5AB2023-08-20011000000015',
        'F6OF2023-08-20012000000128',
        'FGEJ2023-08-20022000000050',
        'FLHT2023-08-20012000000098',
        'FOGS2023-08-20012000000075',
        'FPMD2023-08-20022000000125',
        'FTN52023-08-20012000000111',
        'FWBV2023-08-20022000000012',
        'T1GT2023-08-20022000000107',
        'T61C2023-08-20021000000144',
        'T88A2023-08-20022000000105',
        'T8DO2023-08-20012000000057',
        'T8XU2023-08-20021000000153',
        'TAUH2023-08-20024000000022',
        'TF332023-08-20022000000055',
        'TF782023-08-20012000000048',
        'TFI72023-08-20011000000101',
        'THA12023-08-20011000000051',
        'THA12023-08-20012000000221',
        'THFE2023-08-20012000000081',
        'THK12023-08-20012000000072',
        'TJPG2023-08-20023000000031',
        'TKMJ2023-08-20012000000066',
        'TNJF2023-08-20022000000095',
        'TP2H2023-08-20011000000094',
        'TR2F2023-08-20021000000103',
        'TRRK2023-08-20022000000163',
        'TSAD2023-08-20012000000059',
        'TTY52023-08-20012000000029',
        'TXM12023-08-20022000000051',
        'FD9U2023-08-21022000000055',
        'FFG02023-08-21022000000191',
        'FOK12023-08-21011000000079',
        'FU8C2023-08-21011000000211',
        'FV3G2023-08-21014000000049',
        'T3QQ2023-08-21022000000047',
        'T4BL2023-08-21011000000169',
        'T5ON2023-08-21021000000061',
        'T6612023-08-21012000000045',
        'T88A2023-08-21022000000104',
        'TAUN2023-08-21012000000060',
        'TBVB2023-08-21012000000069',
        'TC3G2023-08-21012000000112',
        'TCUK2023-08-21011000000072',
        'THO12023-08-21022000000179',
        'TJ8T2023-08-21012000000143',
        'TMXX2023-08-21012000000052',
        'TO5A2023-08-21012000000025',
        'TQ3N2023-08-21021000000089',
        'TRAQ2023-08-21021000000058',
        'TRRK2023-08-21013000000030',
        'TUBM2023-08-21012000000171',
        'F70O2023-08-22011000000089',
        'FD512023-08-22012000000121',
        'FD832023-08-22022000000029',
        'FE702023-08-22022000000058',
        'FL982023-08-22012000000160',
        'FQIE2023-08-22021000000013',
        'T11A2023-08-22012000000027',
        'T2722023-08-22012000000233',
        'T7OQ2023-08-22022000000037',
        'T7VV2023-08-22022000000062',
        'TCXF2023-08-22022000000074',
        'TD362023-08-22022000000056',
        'TF732023-08-22032000000115',
        'THTY2023-08-22021000000010',
        'TLBL2023-08-22012000000218',
        'TMNL2023-08-22011000000072',
        'TMU22023-08-22011000000031',
        'TN5A2023-08-22011000000091',
        'TR712023-08-22021000000056',
        'TSUM2023-08-22022000000028',
        'TUE32023-08-22022000000069',
        'TWTW2023-08-22012000000128',
        'TWZA2023-08-22021000000067',
        'TX2F2023-08-22011000000041',
        'F7XK2023-08-23011000000066',
        'FAY32023-08-23022000000068',
        'FHMF2023-08-23012000000014',
        'FJTK2023-08-23011000000036',
        'FQ4Q2023-08-23022000000120',
        'FU8X2023-08-23022000000067',
        'T1F52023-08-23012000000084',
        'T31B2023-08-23022000000103',
        'TASM2023-08-23012000000101',
        'TBB62023-08-23022000000021',
        'TBYV2023-08-23022000000030',
        'TCGB2023-08-23012000000024',
        'TFVP2023-08-23012000000060',
        'TIZ52023-08-23021000000030',
        'TOAN2023-08-23024000000029',
        'TQWV2023-08-23012000000194',
        'TRFD2023-08-23011000000188',
        'TUBM2023-08-23011000000216',
        'TXOD2023-08-23011000000044',
        'F50A2023-08-24022000000114',
        'F8YX2023-08-24012000000047',
        'FAEN2023-08-24022000000049',
        'FEEO2023-08-24012000000122',
        'FOHP2023-08-24021000000015',
        'FZ432023-08-24012000000032',
        'T3QK2023-08-24012000000135',
        'T7ZN2023-08-24031000000073',
        'T8Q12023-08-24022000000137',
        'TB4Q2023-08-24012000000143',
        'TBMS2023-08-24012000000013',
        'TBQK2023-08-24012000000014',
        'TC5N2023-08-24022000000053',
        'TCIT2023-08-24021000000026',
        'TE7I2023-08-24011000000104',
        'TEYE2023-08-24011000000017',
        'TF432023-08-24024000000148',
        'TFN32023-08-24021000000025',
        'TFRQ2023-08-24012000000147',
        'TFZO2023-08-24011000000038',
        'TGET2023-08-24032000000108',
        'TGUE2023-08-24023000000017',
        'TGYM2023-08-24021000000047',
        'THTK2023-08-24011000000051',
        'TKIU2023-08-24012000000138',
        'TLED2023-08-24024000000100',
        'TLTK2023-08-24021000000005',
        'TLZR2023-08-24022000000087',
        'TP4Z2023-08-24023000000057',
        'TR652023-08-24021000000055',
        'TTTK2023-08-24021000000097',
        'TWRR2023-08-24013000000049',
        'TZXF2023-08-24022000000092',
        'T7ZN2023-08-24031000000072',
        'F1RX2023-08-25011000000025',
        'FAFH2023-08-25022000000124',
        'FFQF2023-08-25012000000138',
        'FLCE2023-08-25022000000121',
        'FLYD2023-08-25022000000089',
        'FR952023-08-25011000000007',
        'FS1E2023-08-25012000000035',
        'FZIJ2023-08-25012000000045',
        'T36T2023-08-25012000000069',
        'T7LC2023-08-25032000000076',
        'T8HH2023-08-25012000000066',
        'T9H52023-08-25011000000021',
        'T9OK2023-08-25012000000007',
        'TABL2023-08-25011000000037',
        'TAFO2023-08-25012000000129',
        'TAH82023-08-25022000000131',
        'TAQT2023-08-25022000000033',
        'TAUZ2023-08-25021000000031',
        'TBEL2023-08-25021000000067',
        'TCAV2023-08-25012000000051',
        'TCSH2023-08-25011000000140',
        'TLBT2023-08-25022000000079',
        'TLCR2023-08-25012000000026',
        'TLHW2023-08-25022000000034',
        'TM4I2023-08-25011000000025',
        'TO222023-08-25021000000061',
        'TPDT2023-08-25022000000033',
        'TQ642023-08-25022000000049',
        'TRRK2023-08-25042000000016',
        'TUAN2023-08-25021000000080',
        'TUWO2023-08-25011000000051',
        'TV522023-08-25012000000041',
        'TWAC2023-08-25022000000086',
        'TYYB2023-08-25012000000077',
        'T9OK2023-08-25012000000006',
        'F1CC2023-08-26012000000050',
        'F20H2023-08-26021000000063',
        'F5SF2023-08-26022000000049',
        'FAFH2023-08-26011000000048',
        'FCWU2023-08-26022000000057',
        'FISH2023-08-26022000000077',
        'FITL2023-08-26012000000068',
        'FQJQ2023-08-26021000000082',
        'FROK2023-08-26012000000017',
        'FTPI2023-08-26021000000006',
        'FWS72023-08-26012000000050',
        'T0PX2023-08-26011000000141',
        'T6ZS2023-08-26012000000128',
        'T7LC2023-08-26011000000015',
        'TA172023-08-26011000000053',
        'TAXO2023-08-26012000000013',
        'TBLU2023-08-26011000000120',
        'TBVS2023-08-26022000000065',
        'TCDL2023-08-26022000000087',
        'TCQ32023-08-26012000000025',
        'TDBM2023-08-26021000000131',
        'TFIO2023-08-26022000000082',
        'TGE12023-08-26012000000115',
        'THFE2023-08-26012000000039',
        'TJ4W2023-08-26022000000022',
        'TJ4W2023-08-26022000000083',
        'TKON2023-08-26031000000091',
        'TMCR2023-08-26011000000142',
        'TMCR2023-08-26021000000023',
        'TPLB2023-08-26022000000014',
        'TPPH2023-08-26041000000008',
        'TQ082023-08-26031000000077',
        'TQ422023-08-26021000000034',
        'TS4S2023-08-26011000000111',
        'TS832023-08-26022000000127',
        'TSIV2023-08-26012000000103',
        'TTKW2023-08-26011000000060',
        'TTRW2023-08-26021000000145',
        'TU7O2023-08-26012000000089',
        'TV992023-08-26012000000085',
        'TYWZ2023-08-26024000000058',
        'F4D12023-08-27012000000112',
        'F53L2023-08-27011000000050',
        'F8872023-08-27011000000083',
        'FE702023-08-27012000000092',
        'FFOA2023-08-27021000000149',
        'FP0E2023-08-27022000000088',
        'FQ272023-08-27021000000059',
        'FQ4Q2023-08-27021000000074',
        'FQT22023-08-27032000000156',
        'FR992023-08-27022000000128',
        'FUKP2023-08-27021000000100',
        'FXEY2023-08-27011000000191',
        'T22D2023-08-27012000000030',
        'T3U42023-08-27012000000315',
        'T5NI2023-08-27011000000060',
        'T5W92023-08-27011000000039',
        'T6Q32023-08-27021000000098',
        'T9RZ2023-08-27032000000049',
        'TBGF2023-08-27021000000064',
        'TFST2023-08-27022000000044',
        'THKW2023-08-27021000000021',
        'TIWC2023-08-27012000000101',
        'TIYD2023-08-27012000000052',
        'TL3T2023-08-27011000000053',
        'TLEQ2023-08-27011000000012',
        'TLFA2023-08-27022000000179',
        'TLQM2023-08-27011000000163',
        'TMOR2023-08-27013000000003',
        'TMUA2023-08-27011000000006',
        'TNEY2023-08-27012000000031',
        'TOCE2023-08-27022000000055',
        'TPV42023-08-27012000000057',
        'TQ3M2023-08-27012000000130',
        'TQ7C2023-08-27011000000095',
        'TR0F2023-08-27022000000152',
        'TRHS2023-08-27011000000045',
        'TS8D2023-08-27011000000074',
        'TSL92023-08-27011000000074',
        'TSOD2023-08-27022000000089',
        'TTFV2023-08-27012000000081',
        'TTIH2023-08-27011000000031',
        'TTY52023-08-27012000000121',
        'TUUQ2023-08-27021000000180',
        'TYH42023-08-27021000000025',
        'FEFM2023-08-28021000000024',
        'FHHP2023-08-28012000000018',
        'FLEE2023-08-28012000000069',
        'FSFL2023-08-28021000000062',
        'FTAN2023-08-28021000000032',
        'FV3G2023-08-28022000000171',
        'FX2V2023-08-28022000000105',
        'FY9Y2023-08-28012000000095',
        'T36T2023-08-28012000000087',
        'T4LR2023-08-28011000000206',
        'T6ZS2023-08-28012000000080',
        'T7SR2023-08-28021000000126',
        'T8BU2023-08-28012000000196',
        'T8BU2023-08-28022000000137',
        'TCFW2023-08-28021000000007',
        'TEKO2023-08-28012000000031',
        'TF042023-08-28021000000043',
        'TKKK2023-08-28021000000048',
        'TLHW2023-08-28012000000101',
        'TPV42023-08-28022000000052',
        'TQEB2023-08-28012000000090',
        'TRBC2023-08-28012000000041',
        'TRDA2023-08-28012000000006',
        'TUGL2023-08-28022000000163',
        'TW4I2023-08-28012000000119',
        'TXSI2023-08-28041000000019',
        'TXUZ2023-08-28012000000016',
        'TZWC2023-08-28022000000060',
        'F7C62023-08-29022000000042',
        'F8I62023-08-29012000000131',
        'FABZ2023-08-29024000000016',
        'FLKA2023-08-29012000000179',
        'FLLF2023-08-29021000000045',
        'FMP52023-08-29022000000064',
        'FSPY2023-08-29021000000136',
        'FT5L2023-08-29011000000112',
        'FTRP2023-08-29021000000057',
        'T2OI2023-08-29012000000015',
        'T2OI2023-08-29012000000109',
        'T36T2023-08-29021000000096',
        'T49R2023-08-29022000000187',
        'T4T92023-08-29012000000127',
        'T5AL2023-08-29051000000010',
        'T5DA2023-08-29022000000076',
        'T69T2023-08-29021000000169',
        'T6DH2023-08-29011000000026',
        'T6ZS2023-08-29021000000081',
        'T7QC2023-08-29012000000063',
        'T99R2023-08-29024000000163',
        'T9UE2023-08-29022000000083',
        'TBCB2023-08-29012000000186',
        'TC3X2023-08-29011000000045',
        'TCDK2023-08-29021000000097',
        'TCUW2023-08-29022000000068',
        'TCXJ2023-08-29022000000064',
        'TKK02023-08-29042000000008',
        'TKYJ2023-08-29012000000124',
        'TMSS2023-08-29012000000030',
        'TQ192023-08-29022000000120',
        'TSXL2023-08-29012000000044',
        'TUSA2023-08-29012000000103',
        'TXUA2023-08-29011000000105',
        'TYZU2023-08-29011000000178'] 

        const results = await Models.getServerIris();
        results.forEach( async (r) => { 
          console.log(r.kdcab)
          // ANCHOR ===============Query Ambil Data ========================= 
          await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, `CREATE TABLE IF NOT EXISTS DD_REKAP_BYR LIKE BYR_230801;`)
            for(let ax of dataAcuan){
              
              const queryTembak = `INSERT IGNORE INTO DD_REKAP_BYR SELECT * FROM BYR_2308${ax.substring(12,14)} WHERE concat(TOKO,TANGGAL,STATION,SHIFT,DOCNO) IN('${ax}');`;
              
              await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembak)
              
            }  
          
            console.log(`${r.kdcab}-Selesai`)
        })         
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()