const humanizeDuration = require("humanize-duration")
const shortRussianHumanizer = humanizeDuration.humanizer({
  language: "shortRu",
  languages: {
    shortRu: {
      y: () => "г",
      mo: () => "мес",
      w: () => "нед",
      d: () => "д",
      h: () => "ч",
      m: () => "м",
      s: () => "с",
      ms: () => "мс",
    },
  },
});

export default shortRussianHumanizer