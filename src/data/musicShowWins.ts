export interface MusicShowWin {
  id: string;
  show: "The Show" | "Show Champion" | "M Countdown" | "Music Bank" | "Show! Music Core" | "Inkigayo";
  year: number;
  date: string;
  song: string;
}

export const showsMeta: { name: MusicShowWin["show"]; broadcaster: string }[] = [
  { name: "The Show", broadcaster: "SBS MTV" },
  { name: "Show Champion", broadcaster: "MBC Music" },
  { name: "M Countdown", broadcaster: "Mnet" },
  { name: "Music Bank", broadcaster: "KBS" },
  { name: "Show! Music Core", broadcaster: "MBC" },
  { name: "Inkigayo", broadcaster: "SBS" },
];

export const musicShowWins: MusicShowWin[] = [
  // The Show (16)
  { id: "theshow-2016-0202", show: "The Show", year: 2016, date: "02 Februari", song: "Rough" },
  { id: "theshow-2016-0216", show: "The Show", year: 2016, date: "16 Februari", song: "Rough" },
  { id: "theshow-2016-0719", show: "The Show", year: 2016, date: "19 Juli", song: "Navillera" },
  { id: "theshow-2016-0802", show: "The Show", year: 2016, date: "02 Agustus", song: "Navillera" },
  { id: "theshow-2016-0809", show: "The Show", year: 2016, date: "09 Agustus", song: "Navillera" },
  { id: "theshow-2017-0314", show: "The Show", year: 2017, date: "14 Maret", song: "Fingertip" },
  { id: "theshow-2017-0407", show: "The Show", year: 2017, date: "07 April", song: "Fingertip" },
  { id: "theshow-2017-0808", show: "The Show", year: 2017, date: "08 Agustus", song: "Love Whisper" },
  { id: "theshow-2017-0919", show: "The Show", year: 2017, date: "19 September", song: "Summer Rain" },
  { id: "theshow-2018-0508", show: "The Show", year: 2018, date: "08 Mei", song: "Time for the Moon Night" },
  { id: "theshow-2019-0122", show: "The Show", year: 2019, date: "22 Januari", song: "Sunrise" },
  { id: "theshow-2019-0709", show: "The Show", year: 2019, date: "09 Juli", song: "Fever" },
  { id: "theshow-2020-0211", show: "The Show", year: 2020, date: "11 Februari", song: "Crossroads" },
  { id: "theshow-2020-0218", show: "The Show", year: 2020, date: "18 Februari", song: "Crossroads" },
  { id: "theshow-2020-0721", show: "The Show", year: 2020, date: "21 Juli", song: "Apple" },
  { id: "theshow-2020-1111", show: "The Show", year: 2020, date: "11 November", song: "MAGO" },

  // Show Champion (14)
  { id: "sc-2016-0203", show: "Show Champion", year: 2016, date: "03 Februari", song: "Rough" },
  { id: "sc-2016-0217", show: "Show Champion", year: 2016, date: "17 Februari", song: "Rough" },
  { id: "sc-2016-0224", show: "Show Champion", year: 2016, date: "24 Februari", song: "Rough" },
  { id: "sc-2016-0720", show: "Show Champion", year: 2016, date: "20 Juli", song: "Navillera" },
  { id: "sc-2016-0801", show: "Show Champion", year: 2016, date: "01 Agustus", song: "Navillera" },
  { id: "sc-2016-0810", show: "Show Champion", year: 2016, date: "10 Agustus", song: "Navillera" },
  { id: "sc-2017-0809", show: "Show Champion", year: 2017, date: "09 Agustus", song: "Love Whisper" },
  { id: "sc-2018-0509", show: "Show Champion", year: 2018, date: "09 Mei", song: "Time for the Moon Night" },
  { id: "sc-2018-0516", show: "Show Champion", year: 2018, date: "16 Mei", song: "Time for the Moon Night" },
  { id: "sc-2019-0123", show: "Show Champion", year: 2019, date: "23 Januari", song: "Sunrise" },
  { id: "sc-2019-0710", show: "Show Champion", year: 2019, date: "10 Juli", song: "Fever" },
  { id: "sc-2020-0219", show: "Show Champion", year: 2020, date: "19 Februari", song: "Crossroads" },
  { id: "sc-2020-0722", show: "Show Champion", year: 2020, date: "22 Juli", song: "Apple" },
  { id: "sc-2020-1112", show: "Show Champion", year: 2020, date: "12 November", song: "MAGO" },

  // M Countdown (13)
  { id: "mcd-2016-0204", show: "M Countdown", year: 2016, date: "04 Februari", song: "Rough" },
  { id: "mcd-2016-0211", show: "M Countdown", year: 2016, date: "11 Februari", song: "Rough" },
  { id: "mcd-2016-0218", show: "M Countdown", year: 2016, date: "18 Februari", song: "Rough" },
  { id: "mcd-2016-0721", show: "M Countdown", year: 2016, date: "21 Juli", song: "Navillera" },
  { id: "mcd-2016-0728", show: "M Countdown", year: 2016, date: "28 Juli", song: "Navillera" },
  { id: "mcd-2016-0804", show: "M Countdown", year: 2016, date: "04 Agustus", song: "Navillera" },
  { id: "mcd-2017-0921", show: "M Countdown", year: 2017, date: "21 September", song: "Summer Rain" },
  { id: "mcd-2018-0510", show: "M Countdown", year: 2018, date: "10 Mei", song: "Time for the Moon Night" },
  { id: "mcd-2019-0124", show: "M Countdown", year: 2019, date: "24 Januari", song: "Sunrise" },
  { id: "mcd-2019-0711", show: "M Countdown", year: 2019, date: "11 Juli", song: "Fever" },
  { id: "mcd-2020-0213", show: "M Countdown", year: 2020, date: "13 Februari", song: "Crossroads" },
  { id: "mcd-2020-0220", show: "M Countdown", year: 2020, date: "20 Februari", song: "Crossroads" },
  { id: "mcd-2020-0723", show: "M Countdown", year: 2020, date: "23 Juli", song: "Apple" },

  // Music Bank (13)
  { id: "mb-2016-0205", show: "Music Bank", year: 2016, date: "05 Februari", song: "Rough" },
  { id: "mb-2016-0212", show: "Music Bank", year: 2016, date: "12 Februari", song: "Rough" },
  { id: "mb-2016-0219", show: "Music Bank", year: 2016, date: "19 Februari", song: "Rough" },
  { id: "mb-2016-0226", show: "Music Bank", year: 2016, date: "26 Februari", song: "Rough" },
  { id: "mb-2016-0722", show: "Music Bank", year: 2016, date: "22 Juli", song: "Navillera" },
  { id: "mb-2016-0729", show: "Music Bank", year: 2016, date: "29 Juli", song: "Navillera" },
  { id: "mb-2016-0812", show: "Music Bank", year: 2016, date: "12 Agustus", song: "Navillera" },
  { id: "mb-2017-0811", show: "Music Bank", year: 2017, date: "11 Agustus", song: "Love Whisper" },
  { id: "mb-2018-0511", show: "Music Bank", year: 2018, date: "11 Mei", song: "Time for the Moon Night" },
  { id: "mb-2018-0518", show: "Music Bank", year: 2018, date: "18 Mei", song: "Time for the Moon Night" },
  { id: "mb-2019-0125", show: "Music Bank", year: 2019, date: "25 Januari", song: "Sunrise" },
  { id: "mb-2019-0712", show: "Music Bank", year: 2019, date: "12 Juli", song: "Fever" },
  { id: "mb-2020-0214", show: "Music Bank", year: 2020, date: "14 Februari", song: "Crossroads" },

  // Show! Music Core (4)
  { id: "smc-2018-0512", show: "Show! Music Core", year: 2018, date: "12 Mei", song: "Time for the Moon Night" },
  { id: "smc-2018-0519", show: "Show! Music Core", year: 2018, date: "19 Mei", song: "Time for the Moon Night" },
  { id: "smc-2019-0126", show: "Show! Music Core", year: 2019, date: "26 Januari", song: "Sunrise" },
  { id: "smc-2019-0713", show: "Show! Music Core", year: 2019, date: "13 Juli", song: "Fever" },

  // Inkigayo (12)
  { id: "inki-2016-0207", show: "Inkigayo", year: 2016, date: "07 Februari", song: "Rough" },
  { id: "inki-2016-0221", show: "Inkigayo", year: 2016, date: "21 Februari", song: "Rough" },
  { id: "inki-2016-0228", show: "Inkigayo", year: 2016, date: "28 Februari", song: "Rough" },
  { id: "inki-2016-0724", show: "Inkigayo", year: 2016, date: "24 Juli", song: "Navillera" },
  { id: "inki-2016-0731", show: "Inkigayo", year: 2016, date: "31 Juli", song: "Navillera" },
  { id: "inki-2016-0807", show: "Inkigayo", year: 2016, date: "07 Agustus", song: "Navillera" },
  { id: "inki-2017-0813", show: "Inkigayo", year: 2017, date: "13 Agustus", song: "Love Whisper" },
  { id: "inki-2018-0513", show: "Inkigayo", year: 2018, date: "13 Mei", song: "Time for the Moon Night" },
  { id: "inki-2018-0520", show: "Inkigayo", year: 2018, date: "20 Mei", song: "Time for the Moon Night" },
  { id: "inki-2019-0122", show: "Inkigayo", year: 2019, date: "22 Januari", song: "Sunrise" },
  { id: "inki-2019-0709", show: "Inkigayo", year: 2019, date: "09 Juli", song: "Fever" },
  { id: "inki-2020-0216", show: "Inkigayo", year: 2020, date: "16 Februari", song: "Crossroads" },
];