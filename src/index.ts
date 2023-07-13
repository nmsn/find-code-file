import { glob, globSync } from "glob";
import fs from "fs-extra";
import os from "os";

const LF = os.EOL;
const srcPath = "./";
const resultPath = "./result.json";

const searchText = "";

const fileType = ["vue", "tsx"];

const getFiles = (src: string, ext?: string[]) => {
  const baseOptions = { ignore: "node_modules/**" };

  if (Array.isArray(ext) && ext.length) {
    return globSync(src + `/**/*.{${ext.join(",")}}`, baseOptions);
  }
  return globSync(src + "/**/*", baseOptions).filter(
    (item) => !fs.lstatSync(item).isDirectory()
  );
};

const getFileContent = (fileName: string) => {
  return fs.readFileSync(fileName, "utf-8");
};

const countTextLine = (fileContent: string, searchText: string) => {
  const lines = fileContent.split(LF);

  let lineNum = 0;

  lines.forEach((content, index) => {
    if (content.includes(searchText)) {
      lineNum = index + 1;
    }
  });

  return lineNum;
};

export const calc = (src: string, searchText: string) => {
  const filePaths = getFiles(src);

  console.log(filePaths);

  const result = [] as [string, number][];

  filePaths.forEach((itemSrc) => {
    const content = getFileContent(itemSrc);

    const lineNum = countTextLine(content, searchText);

    lineNum && result.push([itemSrc, lineNum]);
  });

  return {
    src,
    searchText,
    result,
  };
};
