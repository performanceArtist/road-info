import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type EntryPath = [string, string];
type Entry = {
  [key: string]: EntryPath;
};

export const makeEntries = (names: string[], basePath: string) => {
  return names.reduce<Entry>((acc, name) => {
    const indexPath = path.join(__dirname, basePath, name, 'index.tsx');
    const exist = fs.existsSync(indexPath);
    if (exist) {
      acc[name] = ['@babel/polyfill', indexPath];
    }
    return acc;
  }, {});
};

type Alias = {
  [key: string]: string;
};

export const makeFolderAlias = (folderPath: string, target?: string) => {
  const folders = fs.readdirSync(folderPath);
  return folders.reduce<Alias>((acc, folder) => {
    acc[`@${folder}`] = path.resolve(
      __dirname,
      `${target || folderPath}/${folder}`
    );
    return acc;
  }, {});
};

type HTMLPages = HtmlWebpackPlugin[];

export const makeHTMLPages = (pages: string[], basePath: string) => {
  return pages.reduce<HTMLPages>((acc, page) => {
    acc.push(
      new HtmlWebpackPlugin({
        template: `${basePath}/${page}/index.html`,
        filename: `${page}.html`,
        chunks: []
      })
    );
    return acc;
  }, []);
};
