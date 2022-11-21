const invisChars = new RegExp(
    [
      `[\u{13fe}-\u{13ff}]`,
      `[\u{17b4}-\u{17b5}]`,
      `[\u{180b}-\u{180f}]`,
      `[\u{1bca0}-\u{1bca3}]`,
      `[\u{1d173}-\u{1d17a}]`,
      `[\u{2000}-\u{200f}]`,
      `[\u{2028}-\u{202f}]`,
      `[\u{2060}-\u{206f}]`,
      `[\u{61c}-\u{61d}]`,
      `[\u{80}-\u{9f}]`,
      `[\u{e0000}-\u{e0fff}]`,
      `[\u{e47}-\u{e4d}]`,
      `[\u{fe00}-\u{feff}]`,
      `[\u{fff0}-\u{ffff}]`,
      `\u{115f}`,
      `\u{1160}`,
      `\u{2800}`,
      `\u{3164}`,
      `\u{34f}`,
      `\u{ad}`,
      `\u{ffa0}`,
    ].join(`|`),
    `gmu`
  );
  export default invisChars