import generatedTranslations from '../i18n/am.json';
import reviewedTranslations from '../i18n/am-overrides';

const translations = { ...generatedTranslations, ...reviewedTranslations } as Record<string, string>;
const STORAGE_KEY = 'hamere-noah.language.v1';
const ATTRIBUTES = ['alt', 'aria-label', 'title', 'placeholder', 'content'];
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const sourceTitle = document.title;
let language: 'en' | 'am' = 'en';

function translated(value: string) {
  const key = value.trim();
  const result = translations[key];
  if (!result) return value;
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  return `${leading}${result}${trailing}`;
}

function translateText(node: Text) {
  if (node.parentElement?.closest('script, style, noscript, [data-language-label]')) return;
  if (!originalText.has(node)) originalText.set(node, node.nodeValue ?? '');
  const source = originalText.get(node) ?? '';
  const result = language === 'am' ? translated(source) : source;
  if (node.nodeValue !== result) node.nodeValue = result;
}

function translateAttributes(element: Element) {
  let originals = originalAttributes.get(element);
  if (!originals) {
    originals = new Map();
    originalAttributes.set(element, originals);
  }

  for (const attribute of ATTRIBUTES) {
    if (!element.hasAttribute(attribute)) continue;
    if (!originals.has(attribute)) originals.set(attribute, element.getAttribute(attribute) ?? '');
    const source = originals.get(attribute) ?? '';
    element.setAttribute(attribute, language === 'am' ? translated(source) : source);
  }
}

function setSwitchState() {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-language-switch]')) {
    button.setAttribute('aria-pressed', String(language === 'am'));
    button.setAttribute('aria-label', language === 'am' ? 'ወደ እንግሊዝኛ ቋንቋ ይቀይሩ' : 'Switch website language to Amharic');
    const label = button.querySelector<HTMLElement>('[data-language-label]');
    if (label) label.textContent = language === 'am' ? 'English' : 'አማርኛ';
  }
}

function setLanguage(next: 'en' | 'am', persist = true) {
  language = next;
  document.documentElement.lang = language;

  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.parentElement?.closest('script, style, noscript, [data-language-label]')) continue;
    translateText(node);
  }

  for (const element of document.querySelectorAll('[alt], [aria-label], [title], [placeholder], [content]')) {
    translateAttributes(element);
  }

  document.title = language === 'am' ? translated(sourceTitle) : sourceTitle;
  setSwitchState();
  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, language); } catch { /* storage may be disabled */ }
  }
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-language-switch]')) {
  button.addEventListener('click', () => setLanguage(language === 'en' ? 'am' : 'en'));
}

const observer = new MutationObserver((records) => {
  for (const record of records) {
    if (record.type === 'characterData' && record.target instanceof Text) translateText(record.target);
    for (const node of record.addedNodes) {
      if (node instanceof Text) translateText(node);
      else if (node instanceof Element) {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) translateText(walker.currentNode as Text);
        translateAttributes(node);
        node.querySelectorAll('[alt], [aria-label], [title], [placeholder], [content]').forEach(translateAttributes);
      }
    }
  }
});
observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });

let savedLanguage: string | null = null;
try { savedLanguage = localStorage.getItem(STORAGE_KEY); } catch { /* storage may be disabled */ }
setLanguage(savedLanguage === 'am' ? 'am' : 'en', false);
