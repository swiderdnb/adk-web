function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      // Adding index makes position matter more
      hash = hash + i * 31;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}ff`;
  }
  
  function stc(str) {
    const hash = hashCode(str);

    const h = Math.abs(hash % 360);
    const s = 60 + Math.abs((hash >> 8) % 40);
    const l = 40 + Math.abs((hash >> 16) % 30);

    return hslToHex(h, s, l);
  }

console.log('root_agent:', stc('root_agent'), hashCode('root_agent'));
console.log('root_agent/generate_fruit:', stc('root_agent/generate_fruit'), hashCode('root_agent/generate_fruit'));
