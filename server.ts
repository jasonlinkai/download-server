import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// 定義存放 ZIP 文件的目錄
const zipDir = path.join(__dirname, 'zips');

// 下載指定模組的 ZIP 文件
app.get('/download/:module', (req: Request, res: Response) => {
    const moduleName: string = req.params.module; // 顯式定義類型
    const zipPath: string = path.join(zipDir, `${moduleName}.zip`);

    // 檢查文件是否存在
    if (!fs.existsSync(zipPath)) {
        res.status(404).send('Module not found');
        return;
    }

    // 提供文件下載
    res.download(zipPath, `module-${moduleName}.zip`, (err: Error | null) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
