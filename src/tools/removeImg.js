export const removeImg = function (html) {
  // 去掉html中<img src="" />标签
  const imgs = [];
  const data = {};
  while (html.search(/<img/) !== -1) {
    const indexStart = html.indexOf("<img");
    const indexEnd = html.indexOf("/>", indexStart);
    const imgStart = html.indexOf("src", indexStart);
    const imgEnd = html.indexOf('"', imgStart + 5);
    // 提取图片链接
    imgs.push(html.slice(imgStart + 5, imgEnd));
    const htmlPart2 = html.slice(indexEnd + 2);
    const htmlPart1 = html.slice(0, indexStart);
    html = htmlPart1 + htmlPart2;
  }
  data["imgs"] = imgs;
  data["content"] = html;
  return data;
};

export const removeVote = function (html) {
  // 去掉html中<img src="" />标签
  const contents = [];
  while (html.search(/contenteditable/) !== -1) {
    const indexStart = html.indexOf("contenteditable");
    const indexEnd = html.indexOf("</div>", indexStart);
    contents.push(html.slice(0, indexStart - 97)); // 前面的
    html = html.slice(indexEnd + 6); // 后面的
  }
  if (contents.length === 0) {
    contents.push(html);
  }
  return contents;
};
