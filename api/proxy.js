export default async function handler(req, res) {
  const url = "https://www.twse.com.tw/fund/T86?response=csv&selectType=ALLBUT0999";
  
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    
    // 轉碼為 Buffer 再送出，確保不會亂碼
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'text/csv; charset=big5');
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send("Proxy Error");
  }
}