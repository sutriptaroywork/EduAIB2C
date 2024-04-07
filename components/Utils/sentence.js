// stringUtils.js

export function capitalizeSentences(str) {
    // title case 
    if (!str) return '';

    var exceptions = ["a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet", "as", "at", "by", "for", "in", "of", "on", "to", "with"];

    return str.replace(/\b\w+\b/g, function (word, index) {
      if (index === 0 || !exceptions.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      } else {
        return word.toLowerCase();
      }
    });
}
