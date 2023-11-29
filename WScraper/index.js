import fetch from "node-fetch";
import htmlparser from "htmlparser";

/**
 * Initalizes a new WScraper instance
 */
class WScraper {
  /**
   * Initalizes a new WScraper instance
   */
  constructor() {
    this.html = "";
    this.parsedHtml = null;
  }
  /**
   *
   * @param {string} str
   * @returns {Array} Node []
   */
  fromStr(str) {
    this.html = str;
    this.parsedHtml = this.#parser();
    return this.parsedHtml;
  }

  /**
   *
   * @param {str} url
   * @returns {Array} Node []
   */
  async fromURL(url) {
    await this.#fetchHTML(url);
    this.parsedHtml = this.#parser();
    return this.parsedHtml;
  }

  /**
   * fetches html from the provided url
   */
  async #fetchHTML() {
    const response = await fetch(url);
    this.html = await response.text();
  }

  /**
   *
   * @returns Node []
   */
  #parser() {
    const handler = new htmlparser.DefaultHandler((error, dom) => {
      if (error) throw new Error("error occurred while parsing");
    });

    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(this.html);
    return handler.dom;
  }

  /**
   *
   * @param {str} tagName
   * @returns {Array} Node []
   */
  getElementsByTagName = (tagName) => {
    const result = [];

    const finder = (_nodes) => {
      for (let obj of _nodes) {
        if (obj.type === "tag" && obj.name && obj.name === tagName) {
          result.push(obj);
        } else {
          if (obj.children) {
            finder(obj.children);
          } else {
            continue;
          }
        }
      }
    };

    finder(this.parsedHtml);

    return result;
  };

  /**
   *
   * @param {str} className
   * @returns {Array} Node []
   */
  getElementsByClassName = (className) => {
    const result = [];

    const finder = (_nodes) => {
      for (let obj of _nodes) {
        if (
          obj.attribs &&
          obj.attribs.class &&
          obj.attribs.class === className
        ) {
          result.push(obj);
        } else {
          if (obj.children) {
            finder(obj.children);
          } else {
            continue;
          }
        }
      }
    };

    finder(this.parsedHtml);

    return result;
  };
}

export default WScraper;