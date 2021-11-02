import fs from 'fs';
import path from 'path';

    export = (app:any) => {
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.ts")))
        .forEach(file => require(path.resolve(__dirname, file))(app));
};

