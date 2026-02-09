import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Lightweight SplitText replacement (GSAP SplitText is a premium plugin). */
export class SplitText {
  chars: HTMLSpanElement[] = [];
  words: HTMLSpanElement[] = [];
  lines: HTMLSpanElement[] = [];
  private _el: HTMLElement;
  private _original: string;

  constructor(el: HTMLElement, opts: { type?: string } = {}) {
    this._el = el;
    this._original = el.innerHTML;
    const types = (opts.type || 'chars').split(',').map(t => t.trim());
    const text = el.textContent || '';

    if (types.includes('chars') || types.includes('words')) {
      el.innerHTML = '';
      const wordTexts = text.split(/(\s+)/);
      wordTexts.forEach(seg => {
        if (/^\s+$/.test(seg)) {
          el.appendChild(document.createTextNode(seg));
          return;
        }
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        if (types.includes('chars')) {
          seg.split('').forEach(ch => {
            const s = document.createElement('span');
            s.style.display = 'inline-block';
            s.textContent = ch;
            wordSpan.appendChild(s);
            this.chars.push(s);
          });
        } else {
          wordSpan.textContent = seg;
        }
        el.appendChild(wordSpan);
        this.words.push(wordSpan);
      });
    }
    if (types.includes('lines')) {
      this.lines = Array.from(el.children) as HTMLSpanElement[];
    }
  }

  revert() {
    this._el.innerHTML = this._original;
  }
}

export { gsap, ScrollTrigger };
