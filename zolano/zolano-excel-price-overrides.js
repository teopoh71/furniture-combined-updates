(function applyZolanoExcelShowroomPrices() {
  const source = "new-zolano-price-list.xlsx#Sheet1";
  const materials = [
  "\u5e03",
  "CAT30",
  "\u6cb9\u8721\u76ae",
  "NUBUCK"
];
  const rows = [
  {
    "series": "ZL 3792",
    "row": 4,
    "configuration": "1ER",
    "label": "1ER 1260mm",
    "dimensions": "1ER 1260mm",
    "priceOptions": [
      9100.0,
      14043.0,
      14477.32,
      15100.0
    ]
  },
  {
    "series": "ZL 3792",
    "row": 5,
    "configuration": "1ER/T",
    "label": "1ER/T 1260mm",
    "dimensions": "1ER/T 1260mm",
    "priceOptions": [
      11300.0,
      17391.0,
      17928.87,
      18700.0
    ]
  },
  {
    "series": "ZL 3792",
    "row": 6,
    "configuration": "1NA",
    "label": "1NA 980mm",
    "dimensions": "1NA 980mm",
    "priceOptions": [
      7800.0,
      11997.0,
      12368.04,
      12900.0
    ]
  },
  {
    "series": "ZL 3792",
    "row": 7,
    "configuration": "1NAB",
    "label": "1NAB 1450mm",
    "dimensions": "1NAB 1450mm",
    "priceOptions": [
      11400.0,
      15624.0,
      16107.22,
      16800.0
    ]
  },
  {
    "series": "ZL 3792",
    "row": 8,
    "configuration": "1NAT",
    "label": "1NAT 1310mm",
    "dimensions": "1NAT 1310mm",
    "priceOptions": [
      8200.0,
      13485.0,
      13902.06,
      14500.0
    ]
  },
  {
    "series": "ZL 3792",
    "row": 9,
    "configuration": "TABLE",
    "label": "TABLE 570mm",
    "dimensions": "TABLE 570mm",
    "priceOptions": [
      2800.0,
      4371.0,
      4506.19,
      4700.0
    ]
  },
  {
    "series": "ZL 3776",
    "row": 16,
    "configuration": "1NA LONG",
    "label": "1NA LONG 940MM",
    "dimensions": "1NA LONG 940MM",
    "priceOptions": [
      6600.0,
      11700.0,
      12061.86,
      13146.07
    ]
  },
  {
    "series": "ZL 3776",
    "row": 17,
    "configuration": "1NA/T(L)",
    "label": "1NA/T(L) 940MM",
    "dimensions": "1NA/T(L) 940MM",
    "priceOptions": [
      6800.0,
      12400.0,
      12783.51,
      13932.58
    ]
  },
  {
    "series": "ZL 3776",
    "row": 18,
    "configuration": "1NA",
    "label": "1NA 940MM",
    "dimensions": "1NA 940MM",
    "priceOptions": [
      5300.0,
      9800.0,
      10103.09,
      11011.24
    ]
  },
  {
    "series": "ZL 3776",
    "row": 19,
    "configuration": "CORNER",
    "label": "CORNER 1100MM",
    "dimensions": "CORNER 1100MM",
    "priceOptions": [
      6500.0,
      12500.0,
      12886.6,
      14044.94
    ]
  },
  {
    "series": "ZL 3776",
    "row": 20,
    "configuration": "STOOL",
    "label": "STOOL 1140*1140MM",
    "dimensions": "STOOL 1140*1140MM",
    "priceOptions": [
      4800.0,
      8400.0,
      8659.79,
      9438.2
    ]
  },
  {
    "series": "ZL 3776",
    "row": 21,
    "configuration": "ARM",
    "label": "ARM 380MM",
    "dimensions": "ARM 380MM",
    "priceOptions": [
      2300.0,
      3900.0,
      4020.62,
      4382.02
    ]
  },
  {
    "series": "ZL 3776",
    "row": 22,
    "configuration": "TABLE",
    "label": "TABLE 510MM",
    "dimensions": "TABLE 510MM",
    "priceOptions": [
      4700.0,
      5000.0,
      5154.64,
      5617.98
    ]
  },
  {
    "series": "ZL 3776",
    "row": 23,
    "configuration": "STOOL",
    "label": "STOOL 94X70CM",
    "dimensions": "STOOL 94X70CM",
    "priceOptions": [
      null,
      8000.0,
      8247.42,
      8988.76
    ]
  },
  {
    "series": "ZL 3817 MELFE",
    "row": 30,
    "configuration": "2EL",
    "label": "2EL 1810MM",
    "dimensions": "2EL 1810MM",
    "priceOptions": [
      12200.0,
      17400.0,
      17938.14,
      19550.56
    ]
  },
  {
    "series": "ZL 3817 MELFE",
    "row": 31,
    "configuration": "1ER/T",
    "label": "1ER/T 1630MM",
    "dimensions": "1ER/T 1630MM",
    "priceOptions": [
      11700.0,
      18800.0,
      19381.44,
      21123.6
    ]
  },
  {
    "series": "ZL 3778",
    "row": 38,
    "configuration": "2EL",
    "label": "2EL",
    "dimensions": "2EL",
    "priceOptions": [
      16300.0,
      21000.0,
      21649.48,
      23333.33
    ]
  },
  {
    "series": "ZL 3778",
    "row": 39,
    "configuration": "1ER/T",
    "label": "1ER/T",
    "dimensions": "1ER/T",
    "priceOptions": [
      14100.0,
      16500.0,
      17010.31,
      18333.33
    ]
  },
  {
    "series": "ZL 3778",
    "row": 41,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER 3500MM",
    "dimensions": "2EL+1ER 3500MM",
    "priceOptions": [
      null,
      35400.0,
      null,
      39333.33
    ]
  },
  {
    "series": "ZL 3753 (4.2)",
    "row": 45,
    "configuration": "1EL+2ER",
    "label": "1EL+2ER (2880M)",
    "dimensions": "1EL+2ER (2880M)",
    "priceOptions": [
      16250.0,
      22600.0,
      23298.97,
      25681.82
    ]
  },
  {
    "series": "ZL 3753 (4.2)",
    "row": 46,
    "configuration": "3S",
    "label": "3S 2030MM",
    "dimensions": "3S 2030MM",
    "priceOptions": [
      11000.0,
      18100.0,
      18659.79,
      20568.18
    ]
  },
  {
    "series": "ZL 3753 (4.2)",
    "row": 47,
    "configuration": "2s",
    "label": "2s 1730MM",
    "dimensions": "2s 1730MM",
    "priceOptions": [
      9500.0,
      15000.0,
      15463.92,
      17045.45
    ]
  },
  {
    "series": "ZL 3753 (4.2)",
    "row": 48,
    "configuration": "1s",
    "label": "1s 1120MM",
    "dimensions": "1s 1120MM",
    "priceOptions": [
      6200.0,
      9600.0,
      9896.91,
      10909.09
    ]
  },
  {
    "series": "ZL 3753 (4.2)",
    "row": 49,
    "configuration": "HEAD REST",
    "label": "HEAD REST",
    "dimensions": "HEAD REST",
    "priceOptions": [
      900.0,
      1200.0,
      1237.11,
      1363.64
    ]
  },
  {
    "series": "ZL 3727 FERRANTI",
    "row": 53,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER 2580MM",
    "dimensions": "2EL+1ER 2580MM",
    "priceOptions": [
      16800.0,
      26312.0,
      27125.77,
      28600.0
    ]
  },
  {
    "series": "ZL 3727 FERRANTI",
    "row": 54,
    "configuration": "2S",
    "label": "2S 1870MM",
    "dimensions": "2S 1870MM",
    "priceOptions": [
      11000.0,
      17848.0,
      18400.0,
      19400.0
    ]
  },
  {
    "series": "ZL 3727 FERRANTI",
    "row": 55,
    "configuration": "1S",
    "label": "1S 1160MM",
    "dimensions": "1S 1160MM",
    "priceOptions": [
      6900.0,
      11040.0,
      11381.44,
      12000.0
    ]
  },
  {
    "series": "ZL 3727 FERRANTI",
    "row": 56,
    "configuration": "2EL",
    "label": "2EL 1645MM",
    "dimensions": "2EL 1645MM",
    "priceOptions": [
      10800.0,
      16928.0,
      17451.55,
      18400.0
    ]
  },
  {
    "series": "ZL 3727 FERRANTI",
    "row": 57,
    "configuration": "2EL+2ER",
    "label": "2EL+2ER 3290MM",
    "dimensions": "2EL+2ER 3290MM",
    "priceOptions": [
      21600.0,
      33856.0,
      34903.09,
      36800.0
    ]
  },
  {
    "series": "ZL 3727 FERRANTI",
    "row": 58,
    "configuration": "SMALL PILLOW",
    "label": "SMALL PILLOW",
    "dimensions": "SMALL PILLOW",
    "priceOptions": [
      450.0,
      736.0,
      725.0,
      800.0
    ]
  },
  {
    "series": "ZL 2807",
    "row": 63,
    "configuration": "3S",
    "label": "3S (2.07M)",
    "dimensions": "3S (2.07M)",
    "priceOptions": [
      13000.0,
      18800.0,
      19381.44,
      21363.64
    ]
  },
  {
    "series": "ZL 2807",
    "row": 64,
    "configuration": "2S",
    "label": "2S 1.66m)",
    "dimensions": "2S 1.66m)",
    "priceOptions": [
      10600.0,
      15500.0,
      15979.38,
      17613.64
    ]
  },
  {
    "series": "ZL 2807",
    "row": 65,
    "configuration": "1S",
    "label": "1S",
    "dimensions": "1S",
    "priceOptions": [
      6800.0,
      9500.0,
      9793.81,
      10795.45
    ]
  },
  {
    "series": "ZL 2807",
    "row": 66,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (3.2M)",
    "dimensions": "2EL+1ER (3.2M)",
    "priceOptions": [
      21600.0,
      32000.0,
      32989.69,
      36363.64
    ]
  },
  {
    "series": "ZL 2807",
    "row": 67,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (2.9M)",
    "dimensions": "2EL+1ER (2.9M)",
    "priceOptions": [
      19700.0,
      28300.0,
      29175.26,
      32159.09
    ]
  },
  {
    "series": "ZL 2807",
    "row": 68,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (2.3M)",
    "dimensions": "2EL+1ER (2.3M)",
    "priceOptions": [
      14500.0,
      22000.0,
      22680.41,
      25000.0
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 74,
    "configuration": "1EL+1ER \uff082.9m)",
    "label": "1EL+1ER \uff082.9m)",
    "dimensions": "1EL+1ER \uff082.9m)",
    "priceOptions": [
      20100.0,
      28600.0,
      29484.54,
      32500.0
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 75,
    "configuration": "2S",
    "label": "2S (2.05m)",
    "dimensions": "2S (2.05m)",
    "priceOptions": [
      13800.0,
      20500.0,
      21134.02,
      23295.45
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 76,
    "configuration": "1S",
    "label": "1S (1.45m)",
    "dimensions": "1S (1.45m)",
    "priceOptions": [
      9800.0,
      14400.0,
      14845.36,
      16363.64
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 77,
    "configuration": "1EL+1ER",
    "label": "1EL+1ER (2.57m\uff09",
    "dimensions": "1EL+1ER (2.57m\uff09",
    "priceOptions": [
      18800.0,
      26800.0,
      27628.87,
      30454.55
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 78,
    "configuration": "1EL+1NA+1ER(3460MM)",
    "label": "1EL+1NA+1ER(3460MM)",
    "dimensions": "1EL+1NA+1ER(3460MM)",
    "priceOptions": [
      27000.0,
      38000.0,
      38400.0,
      43181.82
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 79,
    "configuration": "1EL+1NA+1ER",
    "label": "1EL+1NA+1ER (3890MM)",
    "dimensions": "1EL+1NA+1ER (3890MM)",
    "priceOptions": [
      29000.0,
      41200.0,
      42474.23,
      46818.18
    ]
  },
  {
    "series": "ZL 2868 LAOREST",
    "row": 80,
    "configuration": "PILLOW",
    "label": "PILLOW",
    "dimensions": "PILLOW",
    "priceOptions": [
      null,
      1500.0,
      1546.39,
      1704.55
    ]
  },
  {
    "series": "ZL 2911",
    "row": 85,
    "configuration": "3s",
    "label": "3s 2350mm",
    "dimensions": "3s 2350mm",
    "priceOptions": [
      20300.0,
      28300.0,
      29175.26,
      32159.09
    ]
  },
  {
    "series": "ZL 2911",
    "row": 86,
    "configuration": "2s",
    "label": "2s 1690mm",
    "dimensions": "2s 1690mm",
    "priceOptions": [
      14600.0,
      20000.0,
      20618.56,
      22727.27
    ]
  },
  {
    "series": "ZL 2911",
    "row": 87,
    "configuration": "1s",
    "label": "1s 1080mm",
    "dimensions": "1s 1080mm",
    "priceOptions": [
      9400.0,
      13000.0,
      13402.06,
      14772.73
    ]
  },
  {
    "series": "ZL 2897",
    "row": 91,
    "configuration": "1EL",
    "label": "1EL",
    "dimensions": "1EL",
    "priceOptions": [
      8400.0,
      10736.0,
      11068.04,
      12200.0
    ]
  },
  {
    "series": "ZL 2897",
    "row": 92,
    "configuration": "CORNER",
    "label": "CORNER",
    "dimensions": "CORNER",
    "priceOptions": [
      10200.0,
      14080.0,
      14515.46,
      16000.0
    ]
  },
  {
    "series": "ZL 2897",
    "row": 93,
    "configuration": "1NA",
    "label": "1NA",
    "dimensions": "1NA",
    "priceOptions": [
      6800.0,
      8976.0,
      9253.61,
      10200.0
    ]
  },
  {
    "series": "ZL 2897",
    "row": 96,
    "configuration": "PILLOW",
    "label": "PILLOW",
    "dimensions": "PILLOW",
    "priceOptions": [
      null,
      1056.0,
      1088.66,
      1200.0
    ]
  },
  {
    "series": "ZL 2897",
    "row": 97,
    "configuration": "1EL+1NA+1NA+C+1ER",
    "label": "1EL+1NA+1NA+C+1ER",
    "dimensions": "1EL+1NA+1NA+C+1ER",
    "priceOptions": [
      40600.0,
      53504.0,
      null,
      60800.0
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 102,
    "configuration": "2S WITH",
    "label": "2S WITH 2 sp (1.97M)",
    "dimensions": "2S WITH 2 sp (1.97M)",
    "priceOptions": [
      13300.0,
      20200.0,
      20824.74,
      22954.55
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 103,
    "configuration": "2S with",
    "label": "2S with 1 sp (1.65m)",
    "dimensions": "2S with 1 sp (1.65m)",
    "priceOptions": [
      11100.0,
      16900.0,
      17422.68,
      19204.55
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 104,
    "configuration": "1S with",
    "label": "1S with 1sp (0.89M)",
    "dimensions": "1S with 1sp (0.89M)",
    "priceOptions": [
      6000.0,
      9200.0,
      9484.54,
      10454.55
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 105,
    "configuration": "2EL+2ER",
    "label": "2EL+2ER (2.8M)",
    "dimensions": "2EL+2ER (2.8M)",
    "priceOptions": [
      18300.0,
      27400.0,
      28247.42,
      31136.36
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 106,
    "configuration": "2EL+2ER",
    "label": "2EL+2ER (3.2M)",
    "dimensions": "2EL+2ER (3.2M)",
    "priceOptions": [
      21700.0,
      32500.0,
      33505.15,
      36931.82
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 107,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (2.41m)",
    "dimensions": "2EL+1ER (2.41m)",
    "priceOptions": [
      16800.0,
      25802.0,
      26600.0,
      29320.45
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 108,
    "configuration": "STOOL",
    "label": "STOOL 75X75CM",
    "dimensions": "STOOL 75X75CM",
    "priceOptions": [
      4000.0,
      6000.0,
      6185.57,
      6818.18
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 109,
    "configuration": "STOOL",
    "label": "STOOL 100X80CM",
    "dimensions": "STOOL 100X80CM",
    "priceOptions": [
      8600.0,
      10700.0,
      11030.93,
      12159.09
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 110,
    "configuration": "PILLOW",
    "label": "PILLOW",
    "dimensions": "PILLOW",
    "priceOptions": [
      null,
      900.0,
      927.84,
      1022.73
    ]
  },
  {
    "series": "ZL 2802 TARZ",
    "row": 111,
    "configuration": "PILLOW COVER",
    "label": "PILLOW COVER",
    "dimensions": "PILLOW COVER",
    "priceOptions": [
      null,
      850.0,
      876.29,
      965.91
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 116,
    "configuration": "2.5S",
    "label": "2.5S 1990MM",
    "dimensions": "2.5S 1990MM",
    "priceOptions": [
      12100.0,
      19000.0,
      19587.63,
      21590.91
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 117,
    "configuration": "2s",
    "label": "2s 1690mm",
    "dimensions": "2s 1690mm",
    "priceOptions": [
      10200.0,
      15600.0,
      16082.47,
      17727.27
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 118,
    "configuration": "1S",
    "label": "1S 930MM",
    "dimensions": "1S 930MM",
    "priceOptions": [
      5700.0,
      8600.0,
      8865.98,
      9772.73
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 119,
    "configuration": "3S",
    "label": "3S (2.1m)",
    "dimensions": "3S (2.1m)",
    "priceOptions": [
      12700.0,
      19300.0,
      19896.91,
      21931.82
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 120,
    "configuration": "2S",
    "label": "2S (2.1M)",
    "dimensions": "2S (2.1M)",
    "priceOptions": [
      13300.0,
      20900.0,
      21546.39,
      23750.0
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 121,
    "configuration": "2EL+2ER",
    "label": "2EL+2ER (3210MM)",
    "dimensions": "2EL+2ER (3210MM)",
    "priceOptions": [
      19800.0,
      30300.0,
      31237.11,
      34431.82
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 122,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (2450MM)",
    "dimensions": "2EL+1ER (2450MM)",
    "priceOptions": [
      15700.0,
      23800.0,
      24536.08,
      27045.45
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 123,
    "configuration": "2EL+2ER",
    "label": "2EL+2ER (2.7M)",
    "dimensions": "2EL+2ER (2.7M)",
    "priceOptions": [
      16700.0,
      25600.0,
      26391.75,
      29090.91
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 124,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (2900MM)",
    "dimensions": "2EL+1ER (2900MM)",
    "priceOptions": [
      17100.0,
      28600.0,
      29484.54,
      32500.0
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 125,
    "configuration": "2EL+1ER",
    "label": "2EL+1ER (2.8M)",
    "dimensions": "2EL+1ER (2.8M)",
    "priceOptions": [
      18000.0,
      27000.0,
      27835.05,
      30681.82
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 126,
    "configuration": "STOOL",
    "label": "STOOL 83X75CM",
    "dimensions": "STOOL 83X75CM",
    "priceOptions": [
      null,
      6000.0,
      6185.57,
      6818.18
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 127,
    "configuration": "STOOL",
    "label": "STOOL 86 X 80",
    "dimensions": "STOOL 86 X 80",
    "priceOptions": [
      null,
      6800.0,
      7010.31,
      7727.27
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 128,
    "configuration": "2EL+2ER",
    "label": "2EL+2ER (3540MM)",
    "dimensions": "2EL+2ER (3540MM)",
    "priceOptions": [
      22200.0,
      34000.0,
      35051.55,
      38636.36
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 129,
    "configuration": "BACKREST CUSHION",
    "label": "BACKREST CUSHION",
    "dimensions": "BACKREST CUSHION",
    "priceOptions": [
      null,
      2500.0,
      2577.32,
      2840.91
    ]
  },
  {
    "series": "ZL 2707 KANDER",
    "row": 130,
    "configuration": "Small Pillow",
    "label": "Small Pillow",
    "dimensions": "Small Pillow",
    "priceOptions": [
      null,
      650.0,
      670.1,
      738.64
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 136,
    "configuration": "2EL",
    "label": "2EL 1520MM",
    "dimensions": "2EL 1520MM",
    "priceOptions": [
      11800.0,
      17300.0,
      17835.05,
      19659.09
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 137,
    "configuration": "Corner",
    "label": "Corner 1320MM",
    "dimensions": "Corner 1320MM",
    "priceOptions": [
      8300.0,
      13300.0,
      13711.34,
      15113.64
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 138,
    "configuration": "2NA",
    "label": "2NA 1220MM",
    "dimensions": "2NA 1220MM",
    "priceOptions": [
      8600.0,
      13200.0,
      13608.25,
      15000.0
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 139,
    "configuration": "1ER/T",
    "label": "1ER/T 910MM",
    "dimensions": "1ER/T 910MM",
    "priceOptions": [
      9600.0,
      14000.0,
      14432.99,
      15909.09
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 140,
    "configuration": "1NA",
    "label": "1NA 610MM",
    "dimensions": "1NA 610MM",
    "priceOptions": [
      4800.0,
      7300.0,
      7525.77,
      8295.45
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 141,
    "configuration": "1EL",
    "label": "1EL 910MM",
    "dimensions": "1EL 910MM",
    "priceOptions": [
      7700.0,
      11300.0,
      11649.48,
      12840.91
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 142,
    "configuration": "1EL/T (D:2400MM)",
    "label": "1EL/T (D:2400MM)",
    "dimensions": "1EL/T (D:2400MM)",
    "priceOptions": [
      16000.0,
      22000.0,
      22680.41,
      25000.0
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 143,
    "configuration": "STOOL",
    "label": "STOOL 25X43CM (O)",
    "dimensions": "STOOL 25X43CM (O)",
    "priceOptions": [
      null,
      1300.0,
      1340.21,
      1477.27
    ]
  },
  {
    "series": "MONTIERI ZL 2628",
    "row": 144,
    "configuration": "2EL+C+2NA+1NA+1ER/T",
    "label": "2EL+C+2NA+1NA+1ER/T",
    "dimensions": "2EL+C+2NA+1NA+1ER/T",
    "priceOptions": [
      43100.0,
      65100.0,
      67113.4,
      73977.27
    ]
  }
];
  const setRows = [
  {
    "series": "ZL 3792",
    "row": 10,
    "label": "\u5168nubuck",
    "price": 47200.0
  },
  {
    "series": "ZL 3792",
    "row": 11,
    "label": "\u5168\u5e03",
    "price": 27900.0
  },
  {
    "series": "ZL 3792",
    "row": 12,
    "label": "\u73b0\u573a\u76ae+\u5e03",
    "price": 40900.0
  },
  {
    "series": "ZL 3776",
    "row": 24,
    "label": "\u5168\u76ae\uff08cat30)",
    "price": 74900.0
  },
  {
    "series": "ZL 3776",
    "row": 25,
    "label": "\u5168\u5e03",
    "price": 42800.0
  },
  {
    "series": "ZL 3776",
    "row": 26,
    "label": "\u73b0\u573a\u76ae(cat30)+\u5e03",
    "price": 47100.0
  },
  {
    "series": "ZL 3817 MELFE",
    "row": 33,
    "label": "\u5168\u76ae\uff08cat30)",
    "price": 36200.0
  },
  {
    "series": "ZL 3817 MELFE",
    "row": 34,
    "label": "\u5168\u5e03",
    "price": 23900.0
  }
];

  function normalizeConfig(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/[\uFF08\uFF09]/g, "")
      .replace(/\s+/g, "")
      .replace(/MM|M$/g, "");
  }

  function buildEntryKey(entry) {
    return [
      String(entry?.series || "").trim().toUpperCase(),
      normalizeConfig(entry?.configuration),
      normalizeConfig(entry?.dimensions || entry?.label || "")
    ].join("|");
  }

  function makeId(series, config, row) {
    return `ZOLANOEXCEL-${series}-${config}-${row}`.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
  }

  function firstNumber(values) {
    const value = values.find((item) => Number(item) > 0);
    return Number(value || 0);
  }

  function parseDimensionWidth(value) {
    const match = String(value || "").match(/(\d{3,5})\s*mm/i);
    return match ? Number(match[1]) : 0;
  }

  const catalog = window.BAIDU_ZOLANO_SOFA_DATA;
  if (!Array.isArray(catalog)) return;
  const excelSeries = new Set(rows.map((entry) => entry.series));
  const photoOverrides = window.BAIDU_PHOTO_OVERRIDES || {};
  const seriesPhotos = new Map();

  catalog.forEach((item) => {
    if (!item?.series) return;
    const override = photoOverrides[item.series];
    if (override && !seriesPhotos.has(item.series)) seriesPhotos.set(item.series, override);
    if (item.photo && !seriesPhotos.has(item.series)) seriesPhotos.set(item.series, item.photo);
  });

  function findPhoto(series) {
    return seriesPhotos.get(series) || photoOverrides[series] || "";
  }

  function upsertCatalogRow(entry) {
    const key = buildEntryKey(entry);
    let target = catalog.find((item) => buildEntryKey(item) === key);
    if (!target) {
      target = {
        id: makeId(entry.series, entry.configuration, entry.row),
        brand: "Zolano",
        series: entry.series,
        model: entry.series,
        name: entry.series,
        configuration: entry.configuration,
        description: "Excel showroom selling price",
        photo: findPhoto(entry.series)
      };
      catalog.push(target);
    }
    const prices = entry.priceOptions.map((value) => value == null ? null : Number(value));
    Object.assign(target, {
      brand: "Zolano",
      series: entry.series,
      model: entry.series,
      name: entry.series,
      configuration: entry.configuration,
      description: entry.label,
      dimensions: entry.dimensions,
      width: parseDimensionWidth(entry.dimensions || entry.label),
      materials,
      priceOptions: prices,
      price: firstNumber(prices),
      priceFactor: 1,
      priceIsFinal: true,
      finalPriceLabel: entry.label,
      source: `${source}!${entry.row}`,
      photo: target.photo || findPhoto(entry.series)
    });
  }

  for (let index = catalog.length - 1; index >= 0; index -= 1) {
    const item = catalog[index];
    if (excelSeries.has(item?.series) && !String(item?.source || "").includes(source)) {
      catalog.splice(index, 1);
    }
  }

  rows.forEach(upsertCatalogRow);

  const combos = window.BAIDU_ZOLANO_RECOMMENDED_COMBOS;
  if (!Array.isArray(combos)) return;
  for (let index = combos.length - 1; index >= 0; index -= 1) {
    const combo = combos[index];
    if (
      String(combo?.id || "").startsWith("ZOLANOEXCELSHOWROOM") ||
      (excelSeries.has(combo?.series) && !String(combo?.source || "").includes(source))
    ) {
      combos.splice(index, 1);
    }
  }

  rows.filter((entry) => /\+/.test(entry.configuration)).forEach((entry) => {
    const prices = entry.priceOptions.map((value) => value == null ? null : Number(value));
    combos.push({
      id: makeId(`ZOLANOEXCELSHOWROOM-${entry.series}`, entry.configuration, entry.row),
      brand: "Zolano",
      series: entry.series,
      name: "Excel combo",
      configuration: entry.configuration,
      description: entry.label,
      dimensions: entry.dimensions,
      partCodes: entry.configuration.split("+").map((part) => part.trim()).filter(Boolean),
      materials,
      priceOptions: prices,
      price: firstNumber(prices),
      priceFactor: 1,
      priceIsFinal: true,
      source: `${source}!${entry.row}`,
      photo: findPhoto(entry.series)
    });
  });

  setRows.forEach((entry) => {
    combos.push({
      id: makeId(`ZOLANOEXCELSHOWROOM-${entry.series}`, entry.label, entry.row),
      brand: "Zolano",
      series: entry.series,
      name: "å±•åŽ…æ•´å¥—",
      configuration: entry.label,
      description: entry.label,
      dimensions: "Excel showroom full set",
      partCodes: [],
      materials: ["æ•´å¥—"],
      priceOptions: [Number(entry.price || 0)],
      price: Number(entry.price || 0),
      priceFactor: 1,
      priceIsFinal: true,
      showroomFullSet: true,
      showroomNote: "showroom-full-set",
      source: `${source}!${entry.row}`,
      photo: findPhoto(entry.series)
    });
  });
}());

